import { Component, ViewChild } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Task } from '../models/task';
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

  constructor(private taskService: TasksService, private toastController: ToastController, private alertController: AlertController) {
    // this.tasks = this.taskService.getTasks();
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });  

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

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast'
    });

    await toast.present();
  }
  async toastCompleted(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }
  public addTask(){
    let count = this.tasks.length;
    const aux: Task = { task: this.task, completed: false }
    this.taskService.addTask(aux).then(res=>{                  
      this.task = "";
      this.presentToast('bottom', 'Tarea agregda exitosamente');
    }).catch(err=>{
      this.presentToast('bottom', 'Hubo un error al agregar la tarea');
    });
  }

  public completeTask(id: string) {
    console.log(this.tasks);
    this.taskService.completedTask(id).then(res=>{
      this.toastCompleted('bottom', 'Tarea marcada como completada con éxito')
    });
    // if (this.tasks[pos].completed === true) {
    //   this.toastCompleted('bottom', 'La tarea ya está marcada como completada')
    // } else {
    //   this.tasks[pos].completed = true;
    // }
  }
}
