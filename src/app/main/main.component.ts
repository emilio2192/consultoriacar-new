import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirestoreService } from 'app/service/firestore.service';
import { AppState } from 'app/store/reducers';
import { selectCurrentUser } from 'app/store/selectors/auth.selector';
import { Subject, filter, isEmpty, take, takeUntil } from 'rxjs';
import * as casesActions from '../store/actions/cases.actions';
import * as userActions from '../store/actions/users.actions';
import * as casesSelector from '../store/selectors/cases.selector';
import { User } from 'app/store/interfaces/user.interface';
import { Case } from 'app/store/interfaces/cases.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ngUnsubscribe = new Subject<void>();
  menuOpen = false;
  statusOptionSelected!:boolean;
  clientSelected!: string | null;
  
  constructor(private firestoreService: FirestoreService,private store: Store<AppState>){
    
    this.fetchData();

  }

  ngOnInit(): void {
    this.subscribeFilters();
  }
  fetchData = async () => {
    // extract status selected of cases
    await this.store.select(casesSelector.selectStatusSelected)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(status => this.statusOptionSelected = status);

    await this.store.select(casesSelector.selectClientSelected)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(client => this.clientSelected = client);

    
    this.firestoreService.getUsers().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(users => {
      console.log({users})
      this.store.dispatch(userActions.successUsersLoaded({users: users as unknown as User[]}));
    })
  }
  subscribeFilters = () => {
    this.store.select(casesSelector.selectClientSelected)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(client => {
      if(client) this.loadCases(this.statusOptionSelected, client as string);
    })
    this.store.select(casesSelector.selectStatusSelected)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(status => {
        this.loadCases(status, this.clientSelected as string)
    })
  }

  loadCases = (status?:boolean, client?:string) => {
    console.log('action loadCases');
    this.firestoreService.getFilterCases(status, client)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => this.store.dispatch(casesActions.loadedCases({cases:result as unknown as Case[]})));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
