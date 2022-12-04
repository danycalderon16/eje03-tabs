import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];


  constructor(private firestore: AngularFirestore) {

  }

  // public getTasks():Task[]{
  //   return this.tasks;
  // }

  public getTasks(): Observable<Task[]> {
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public async addTask(task: Task): Promise<any> {
    const id = new Date().valueOf().toString();
    return new Promise((resolve, reject) => {
      this.firestore.collection('tasks').doc(id).set(task)
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  }

  public removeTask(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('tasks').doc(id).delete()
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  }

  public completedTask(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('tasks').doc(id).update({ "completed": true })
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  }
  public incompletedTask(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('tasks').doc(id).update({ "completed": false })
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  }
}
