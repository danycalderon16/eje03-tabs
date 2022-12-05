import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Task } from '../models/task';
import { AuthService } from '../services/auth.service';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('input') myInput;

  public tasks: Task[];
  public task: string;
  public name: string = '';
  constructor(private taskService: TasksService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
    private auth: AuthService) {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
    this.name = auth.getCurrentUser().displayName.toLowerCase().split(" ").slice(0,2).map(name => {
      return name[0].toUpperCase() + name.slice(1);
    }).join(' ');
    
    // this.name = names.join(' ');
    
  }

  async removeTask(id: string) {
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

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, time?: number) {
    const toast = await this.toastController.create({
      message,
      duration: time || 1500,
      position,
      cssClass: 'custom-toast'
    });

    await toast.present();
  }

  public addTask() {
    const aux: Task = { task: this.task, completed: false }
    this.taskService.addTask(aux).then(res => {
      this.task = "";
      this.presentToast('bottom', 'Tarea agregda exitosamente');
    }).catch(err => {
      this.presentToast('bottom', 'Hubo un error al agregar la tarea');
    });
  }

  public completeTask(id: string) {
    console.log(this.tasks);
    this.taskService.completedTask(id).then(res => {
      this.presentToast('bottom', 'Tarea marcada como completada con éxito')
    });
  }

  public async logOut() {
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
            this.auth.logOut().then(res => {
              console.log(res);
              this.router.navigate(['..']);
            });
            this.presentToast('bottom', 'Adios', 300);
          },
        },
      ],
    });
    await alert.present();
  }
}
