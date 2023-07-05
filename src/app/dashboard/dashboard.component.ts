import {Buffer} from 'buffer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/reducers';
import * as casesSelector from '../store/selectors/cases.selector';
import { Observable, Subject, filter, of, take, takeLast, takeUntil } from 'rxjs';
import { Case } from 'app/store/interfaces/cases.interface';

import * as userSelector from '../store/selectors/users.selector';
import * as casesActions from '../store/actions/cases.actions';
import { User } from 'app/store/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {saveAs} from "file-saver";
import { selectCurrentUser } from '../store/selectors/auth.selector';
import { FirestoreService } from 'app/service/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cases$!:Case[];
  users!: User[];
  userLoaded = false;
  ngUnsubscribe = new Subject<void>();
  dataSource = new MatTableDataSource();
  columns = [{prop:'correlative'}, {name:'client'}, {name:'status'}, {name:'details'}];
  columnsToDisplay = ['correlative', 'clientName', 'status','Archivos', 'options'];
  statusOptionSelected!:boolean;
  clientSelected!: string | null;
  private paginator!: MatPaginator;
  private sort!: MatSort;
  currentUser!: any;

  initialCorrelative!: number;
  finalCorrelative!: number;
  userToCreate!:string;
  correlativeToSearch!: number;

  constructor(
    private store: Store<AppState>,
    private firestoreService: FirestoreService,
    private _snackBar: MatSnackBar
  ){
   this.loadData()
  }
  
  ngOnInit(): void {

  }

  returnName(uid:string){
    return this.users.find(user => user.uid === uid)?.name || '';
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  loadData = async () => {
    await this.store.select(selectCurrentUser).pipe(
      filter(value => value !== null),
      takeUntil(this.ngUnsubscribe),
    )
    .subscribe( (response) => {
      if(response){
        this.currentUser = response;
        if(!response.admin){
          this.store.dispatch(casesActions.setClientSelected({client: response.uid}));
        }
      }

    });

    await this.store.select(casesSelector.selectStatusSelected)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(status => this.statusOptionSelected = status);

    await this.store.select(casesSelector.selectClientSelected)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(client => this.clientSelected = client);

  

    await this.store.select(userSelector.selectAllUsers)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      users => {
        if(users.length > 0){
          this.users = users
          this.userLoaded = true;
        }
        
      }
    )
    this.loadDataTable();
  }

  setDataSourceAttributes(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectClient = (event:any) => {
    this.store.dispatch(casesActions.loadedCases({cases:[]}));
    this.dataSource.data = [];
    this.store.dispatch(casesActions.setClientSelected({client:event.value}));
  }

  selectStatus = (event:any) => {
    this.store.dispatch(casesActions.setStatusSelected({status: event.value}));
  }
  exportCsv = async () => {
    let data = 'correlativo,cliente,archivos,finalizada,\r\n';
    let content  = await Promise.all(this.dataSource.data.map(i =>{
      //@ts-ignore
      return `${i.correlative},${i.clientName},${(i.files[0]?.url)},${i.isFinish? 'Finalizada' : 'Abierta'}\r\n`
    }))
    data += content.join('');
    const dataBlob = new Blob([Buffer.from(data, 'utf-8')], {type:'text/csv;charset=utf-8'})
    
    await saveAs(dataBlob, 'listado-correlativos.csv');
  }

  createCorrelatives = async () => {
    if(this.initialCorrelative > 0 && this.finalCorrelative !== null && this.userToCreate !== null){
      const result = await this.firestoreService.createCorrelatives(this.initialCorrelative,this.finalCorrelative, this.userToCreate);
      if(result){
        this._snackBar.open('Correlativos creados exitosamente', undefined, {duration:10});
      }
    }
  }
  
  filter =  async () => {
    if(this.correlativeToSearch){
      (await this.firestoreService.getCorrelative(this.correlativeToSearch)).pipe(take(1))
      .subscribe((caseItem) => {
        if(caseItem.length > 0){
          // @ts-ignore
          this.dataSource.data = caseItem.map((value:Case) => {
            const clientName = this.users.find(user => user.uid === value.client)?.name;
            return {...value, clientName};
          });
          this.setDataSourceAttributes()
        }
      })
    }
  }

  clearFilter() {
    this.correlativeToSearch = 0;
    this.loadDataTable();
  }

  loadDataTable() {
    this.store.select(casesSelector.selectAllCases)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((caseItem: Case[]) => {
      if(caseItem.length > 0){
        this.cases$ = caseItem.map(value => {
          const clientName = this.users.find(user => user.uid === value.client)?.name;
          return {...value, clientName};
        });
        this.dataSource.data = this.cases$;
        this.setDataSourceAttributes()
      }
    })
  }

  async deleteCorrelative(correlative:number) {
    
    await this.firestoreService.deleteCorrelative(correlative);
    this.loadDataTable();
  }

}
