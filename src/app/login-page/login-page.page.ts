import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  constructor(private auth:AuthService,
    private router:Router,
    private toastController:ToastController) { }

  ngOnInit() {
  }

  async onGoogleLogin() {
    try {
      const user = await this.auth.loginGoogle();
      if (user) {
        const name = this.auth.getCurrentUser().displayName.toLowerCase().split(" ").slice(0,2).map(name => {
          return name[0].toUpperCase() + name.slice(1);
        }).join(' ');
        this.router.navigate(['tabs']);
        this.presentToast('bottom',`Hola ${name}`,500);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, time?: number) {
    const toast = await this.toastController.create({
      message,
      duration: time || 1500,
      position,
      cssClass: 'custom-toast'
    });

    await toast.present();
  }
}
