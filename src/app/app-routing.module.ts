import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { UsersComponent } from './users/users.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'forgot', component: ForgotComponent},
  {
    path:'main', component: MainComponent, children:[
      {path:'dashboard', component: DashboardComponent},
      {path: 'users', component: UsersComponent},
      {path: 'case-detail/:id', component: CaseDetailComponent}
    ], 
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin} 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
