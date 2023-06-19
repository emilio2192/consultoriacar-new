import { Component } from '@angular/core';
// import { AuthService } from 'app/service/auth.service';
import { AuthService } from '../../service/auth.service';
import * as authActions from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { FirestoreService } from 'app/service/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string ;
  password!: string ;
  hide = true;
  loginRequest: any;
  error = false;
  constructor(private authService: AuthService, private firestoreService: FirestoreService, private store: Store, private router: Router) {}

  ngOnInit(): void {}

  login = async () => {
    try {
      this.error = false;
      const response = await this.authService.login(this.email, this.password);  
      if(response.user?.uid){
        this.store.dispatch(authActions.saveSessionUid({uid:response.user.uid}))
        const res = await this.firestoreService.getUser(response.user.uid);
        this.store.dispatch(authActions.saveCurrentUser({user:res}));
        this.router.navigate(['main/dashboard'])

      }
    } catch (error) {
      this.error = true;
    }
    
  }
  logout = () => {
    this.authService.logout();
  }

  forgot = () => {
    // this.router.navigate(['forgotpwd']);
  }
}
