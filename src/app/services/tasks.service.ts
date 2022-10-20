import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: string[] = [];

  constructor() {
  }

  public getTasks():string[]{
    return this.tasks;
  }

  public addTask(task:string){
    this.tasks.push(task);
  }

  public removeTask(pos:number){
    this.tasks.splice(pos,1);
  }
  
}
