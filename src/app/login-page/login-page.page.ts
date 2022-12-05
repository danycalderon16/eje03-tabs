import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  constructor(private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  async onGoogleLogin() {
    try {
      const user = await this.auth.loginGoogle();
      if (user) {
        this.router.navigate(['tabs'])       
      }
    } catch (error) {
      console.log(error);
    }
  }


}
