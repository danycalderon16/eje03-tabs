import { Component, ViewChild } from '@angular/core';
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

  constructor(private taskService:TasksService) {
    this.tasks = this.taskService.getTasks();
    
  }
  public addTask(){
    this.taskService.addTask(this.task);
    this.tasks = this.taskService.getTasks();
    this.task = ""
    console.log(this.tasks);
    this.myInput.setFocus()
  }

  public removeTask(pos:number){
    if(confirm('¿Está seguro de borrar esta tarea?')){
      this.taskService.removeTask(pos);
      this.tasks = this.taskService.getTasks()
    }
  }
}
