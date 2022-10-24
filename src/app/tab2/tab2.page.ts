import { Component, ViewChild } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  public tasks: Task[];
  public task: string;

  constructor(private taskService:TasksService,private toastController: ToastController) {
    this.tasks = this.taskService.getTasks();
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

  public incompleteTask(pos:number){
    if(this.tasks[pos].completed === false){
      this.toastCompleted('bottom','La tarea ya está marcada como incompletada')
    }else{
      this.tasks[pos].completed = false;
      this.toastCompleted('bottom','Tarea marcada como incompleta')
    }
  }

}
