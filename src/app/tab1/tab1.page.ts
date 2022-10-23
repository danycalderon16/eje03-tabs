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
  @ViewChild('input') myInput ;

  // public photos = [];
  // private lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam tempore eius repellat a, nihil commodi vero molestias exercitationem suscipit porro veritatis voluptate labore dolorem numquam, fugit, at corporis modi eveniet."

  public tasks: Task[];
  public task: string;

  constructor(private taskService:TasksService,private toastController: ToastController,private alertController: AlertController) {
    this.tasks = this.taskService.getTasks();
    
  }

  async removeTask(pos:number) {
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
            const taskRemoved = this.taskService.removeTask(pos);
            this.tasks = this.taskService.getTasks()
            this.presentToast('bottom','Se elimino la tarea corretamente',()=>{
              this.tasks.splice(pos,0,taskRemoved[0]);
              this.tasks = this.taskService.getTasks();
            }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:string,callback) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Deshacer',
          handler: () => {               
            callback();
          }
        }
      ]
    });

    await toast.present();
  }
  async toastCompleted(position: 'top' | 'middle' | 'bottom', message:string) {
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
    const aux:Task = {task:this.task, completed:false}
    this.taskService.addTask(aux);
    this.tasks = this.taskService.getTasks();
    this.task = "";
    if(count === (this.tasks.length-1)){
      this.presentToast('bottom','Tarea agregda exitosamente', () => {
        this.tasks.pop()
        this.tasks = this.taskService.getTasks();
      });
    }else{
      this.presentToast('bottom','Hubo un error al agregar la tarea',()=>{});
    }
    this.myInput.setFocus();
    console.log(this.tasks);
  }

  public completeTask(pos:number){
    if(this.tasks[pos].completed === true){
      this.toastCompleted('bottom','La tarea ya está marcada como completada')
    }else{
      this.tasks[pos].completed = true;
      this.toastCompleted('bottom','Tarea marcada como completada con éxito')
    }
  }
}
