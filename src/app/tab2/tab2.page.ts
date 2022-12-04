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
  public show = false;

  constructor(private taskService:TasksService,private toastController: ToastController) {
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

  async toastCompleted(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

  public incompleteTask(id:string){
    this.taskService.incompletedTask(id).then(res=>{
      this.toastCompleted('bottom','Se ha marcado como incompleta correctamente');
    })
  }

}
