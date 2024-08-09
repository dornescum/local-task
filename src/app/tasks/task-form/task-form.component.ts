import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../models/models";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() taskSaved = new EventEmitter<void>();
  taskForm!: FormGroup;
  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // ngOnInit(): void {
  // }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes ', changes)
    if (changes['task'] && this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      if (this.task) {
        this.taskService.updateTask({ ...this.task, ...taskData }).subscribe(
          () => {
            this.taskSaved.emit();
            this.taskForm.reset();
          },
          error => console.error('Error updating task:', error)
        );
      } else {
        this.taskService.addTask(taskData).subscribe(
          () => {
            this.taskSaved.emit();
            this.taskForm.reset();
          },
          error => console.error('Error adding task:', error)
        );
      }
    }
  }

}
