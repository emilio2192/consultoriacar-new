import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  email!:string;
  password!: string;
  name!:string;
  role!:string;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {}

  async create(){
    const createUser = await this.authService.createUser(this.email, this.password,this.role, this.name);
    if(createUser){
      this._snackBar.open('Usuario Agregado exitosamente',undefined, {duration: 5});
      this.email = '';
      this.name = '';
      this.role = '';
      this.password = '';
    }else {
      this._snackBar.open('Algo Ocurrio contacta a soporte', undefined, {duration:10});
    }
  }
}
