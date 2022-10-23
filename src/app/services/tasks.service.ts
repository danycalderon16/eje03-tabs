import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];

  constructor() {
    this.tasks.push({task:"Ejemplo 1",completed:false})
    this.tasks.push({task:"Ejemplo 2",completed:true})
    this.tasks.push({task:"Ejemplo 3",completed:true})
    this.tasks.push({task:"Ejemplo 4",completed:true})
  }

  public getTasks():Task[]{
    return this.tasks;
  }

  public addTask(task:Task){
    this.tasks.push(task);
  }

  public removeTask(pos:number){
    return this.tasks.splice(pos,1);
  }  
}
