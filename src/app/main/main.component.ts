import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirestoreService } from '../service/firestore.service';
import { AppState } from '../store/reducers';
import { Subject, take, takeUntil } from 'rxjs';
import * as casesActions from '../store/actions/cases.actions';
import * as userActions from '../store/actions/users.actions';
import * as authActions from '../store/actions/auth.actions';
import * as casesSelector from '../store/selectors/cases.selector';
import { User } from '../store/interfaces/user.interface';
import { Case } from '../store/interfaces/cases.interface';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { selectCurrentUser } from '../store/selectors/auth.selector';

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
  currentUser!: any;
  
  constructor(
    private firestoreService: FirestoreService,
    private store: Store<AppState>, 
    private authService: AuthService,
    private router: Router
  ){
    
    this.fetchData();

  }

  ngOnInit(): void {
    this.subscribeFilters();
  }
  fetchData = async () => {
    await this.store.select(selectCurrentUser).pipe(
      take(1),
    )
    .subscribe( (response) => {
      if(response){
        this.currentUser = response;
      }
    });
    // extract status selected of cases
    await this.store.select(casesSelector.selectStatusSelected)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(status => this.statusOptionSelected = status);

    await this.store.select(casesSelector.selectClientSelected)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(client => this.clientSelected = client);

    
    this.firestoreService.getUsers().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(users => {
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
    this.firestoreService.getFilterCases(status, client)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => this.store.dispatch(casesActions.loadedCases({cases:result as unknown as Case[]})));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout = async () => {
    await this.authService.logout()
    await this.store.dispatch(authActions.logOutAction());
    this.router.navigate(['login']);
  };
}
