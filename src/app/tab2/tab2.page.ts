import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Task } from '../models/task';
import { AuthService } from '../services/auth.service';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  public tasks: Task[];
  public task: string;
  public show = false;

  constructor(private taskService:TasksService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router:Router,
    private auth:AuthService) {
    this.taskService.getTasks().subscribe(res=>{
      this.tasks = res;
      this.tasks.forEach(task => {
        if(task.completed===true){
          this.show = true;
          return;
        }
      })
    });
    
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:string,time?:number) {
    const toast = await this.toastController.create({
      message,
      duration: time | 1500,
      position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

  public incompleteTask(id:string){
    this.taskService.incompletedTask(id).then(res=>{
      this.presentToast('bottom','Se ha marcado como incompleta correctamente');
    })
  }
  public async logOut(){
    const alert = await this.alertController.create({
      header: '¿Está seguro de salir de la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.auth.logOut().then(res =>{
              console.log(res);
              this.router.navigate(['..']);
            });
            this.presentToast('bottom', 'Adios',300);
          },
        },
      ],
    });
    await alert.present();    
  }
  async removeTask(id:string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de borrar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            const taskRemoved = this.taskService.removeTask(id);
            this.taskService.getTasks().subscribe(res => {
              this.tasks = res;
            });
            this.presentToast('bottom', 'Se elimino la tarea corretamente');
          },
        },
      ],
    });

    await alert.present();
  }
}
