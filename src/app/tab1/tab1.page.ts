import { Component, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
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

  constructor(private taskService:TasksService,private toastController: ToastController) {
    this.tasks = this.taskService.getTasks();
    
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Deshacer',
          handler: () => {               
            this.tasks.pop()
            this.tasks = this.taskService.getTasks();
          }
        }
      ]
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
      this.presentToast('bottom','Tarea agregda exitosamente');
    }else{
      this.presentToast('bottom','Hubo un error al agregar la tarea');
    }
    this.myInput.setFocus();
    console.log(this.tasks);
    
  }

  public removeTask(pos:number){
    if(confirm('¿Está seguro de borrar esta tarea?')){
      this.taskService.removeTask(pos);
      this.tasks = this.taskService.getTasks()
    }
  }

  public completeTask(pos:number){
    this.tasks[pos].completed = true;
  }
}
