import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];

  constructor() {
    this.tasks.push({task:"Ejemplo",completed:false})
    this.tasks.push({task:"Ejemplo",completed:true})
  }

  public getTasks():Task[]{
    return this.tasks;
  }

  public addTask(task:Task){
    this.tasks.push(task);
  }

  public removeTask(pos:number){
    this.tasks.splice(pos,1);
  }
  
}
