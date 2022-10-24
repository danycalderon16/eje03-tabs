import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];

  constructor() {
  
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
