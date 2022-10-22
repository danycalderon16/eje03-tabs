import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
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

  public tasks: string[];
  public task: string;

  constructor(private taskService:TasksService,private toastController: ToastController) {
    this.tasks = this.taskService.getTasks();
    
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position
    });

    await toast.present();
  }
  public addTask(){
    let count = this.tasks.length;
    this.taskService.addTask(this.task);
    this.tasks = this.taskService.getTasks();
    this.task = "";
    if(count === (this.tasks.length-1)){
      this.presentToast('bottom','Tarea agregda exitosamente');
    }else{
      this.presentToast('bottom','Hubo un error al agregar la tarea');
    }
    this.myInput.setFocus();
  }

  public removeTask(pos:number){
    if(confirm('¿Está seguro de borrar esta tarea?')){
      this.taskService.removeTask(pos);
      this.tasks = this.taskService.getTasks()
    }
  }
}
