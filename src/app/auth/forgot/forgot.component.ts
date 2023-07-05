import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  email!: string;
  constructor(private router: Router, private authService: AuthService){}
  async resetPassword(){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){
      const resetPassword = await this.authService.resetPassword(this.email);
      if(resetPassword){
        this.router.navigate(['/login']);
      }
    }
  }
}
