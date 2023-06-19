import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ForgotpwdComponent } from './auth/forgotpwd/forgotpwd.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  // {path:'forgotpwd', component: ForgotpwdComponent},
  {path:'main', component: MainComponent, children:[
    {path:'dashboard', component: DashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
