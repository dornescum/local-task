import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Task} from "../models/models";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly TASKS_KEY = 'tasks';

  constructor(private authService: AuthService) { }

  private getAllTasks(): Task[] {
    return JSON.parse(localStorage.getItem(this.TASKS_KEY) || '[]');
  }

  getTasks(): Observable<Task[]> {
    const tasks = this.getAllTasks();
    const currentUser =  this.authService.getCurrentUser();
    const userId = currentUser.id;
    const filteredTasks = tasks.filter(task => task.userId === userId);
    return of(filteredTasks);
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  }

  addTask(task: Task): Observable<Task> {
    const tasks = this.getAllTasks();
    task.id = Date.now().toString();
    const currentUser = this.authService.getCurrentUser();
    task.userId = currentUser.id;
    tasks.push(task);
    this.saveTasks(tasks);
    return of(task);
  }

  updateTask(task: Task): Observable<Task | null> {
    const tasks = this.getAllTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.saveTasks(tasks);
      return of(task);
    }
    return of(null);
  }

  deleteTask(id: string): Observable<void> {
    const tasks = this.getAllTasks();
    const filteredTasks = tasks.filter((t:Task) => t.id !== id);
    this.saveTasks(filteredTasks);
    return of(void 0);
  }
}
