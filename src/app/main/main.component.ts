import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirestoreService } from 'app/service/firestore.service';
import { AppState } from 'app/store/reducers';
import { selectCurrentUser } from 'app/store/selectors/auth.selector';
import { Subject, filter, isEmpty, takeUntil } from 'rxjs';
import * as casesActions from '../store/actions/cases.actions';
import * as userActions from '../store/actions/users.actions';
import { User } from 'app/store/interfaces/user.interface';
import { Case } from 'app/store/interfaces/cases.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  ngUnsubscribe = new Subject<void>();
  menuOpen = false;
  constructor(private firestoreService: FirestoreService,private store: Store<AppState>){
    
    this.fetchData();
  }

  fetchData = async () => {
    this.store.select(selectCurrentUser).pipe(
      filter(value => value !== null),
      takeUntil(this.ngUnsubscribe),
    )
    .subscribe( (response) => {
      console.log({response});
      if(response){

        if(response.admin){
          this.firestoreService.getFilterCases(response.uid)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(result => this.store.dispatch(casesActions.loadedCases({cases:result as unknown as Case[]})));
        }else{
          this.firestoreService.getFilterCases()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(result => this.store.dispatch(casesActions.loadedCases({cases:result as unknown as Case[]})));
        }
        
      }
    }, error => {
      console.log('error --->',{error});
    })
    this.firestoreService.getUsers().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(users => {
      console.log({users})
      this.store.dispatch(userActions.successUsersLoaded({users: users as unknown as User[]}));
    })
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
