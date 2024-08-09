import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/models";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks,
      error => console.error('Error loading tasks:', error)
    );
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(
      () => this.loadTasks(),
      error => console.error('Error deleting task:', error)
    );
  }

  editTask(task: Task) {
    console.log('task ', task)
    this.editingTask = { ...task };
  }

  onTaskSaved() {
    this.editingTask = null;
    this.loadTasks();
  }
}
