import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/reducers';
import * as casesSelector from '../store/selectors/cases.selector';
import { Observable, Subject, filter, of, take, takeLast, takeUntil } from 'rxjs';
import { Case } from 'app/store/interfaces/cases.interface';

import * as userSelector from '../store/selectors/users.selector';
import { User } from 'app/store/interfaces/user.interface';


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

  columns = [{prop:'correlative'}, {name:'client'}, {name:'status'}, {name:'details'}];

  constructor(private store: Store<AppState>){
    this.store.select(userSelector.selectAllUsers)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      users => {
        console.log('cargado de usuarios',users)
        if(users.length > 0){
          this.users = users
          this.userLoaded = true;
        }
        
      }
    )
    this.store.select(casesSelector.selectAllCases)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((caseItem: Case[]) => {
      if(caseItem.length > 0){
        
        
        this.cases$ = caseItem;
      }
    })
  }
  
  ngOnInit(): void {

  }

  returnName(uid:string){
    return this.users.find(user => user.uid === uid)?.name || '';
  }

}
