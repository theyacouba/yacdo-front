import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../core/models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  todos!: Todo[];
  newTodo!: string;
  done!: Boolean;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
    console.log(this.done)
  }

  loadTodos(): void {
    this.todoService.getAllTodo().subscribe({
      next: (value) => {
        this.todos = value.body.reverse();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onNewTodo() {
    console.log(this.newTodo);
    this.todoService.addTodo(this.newTodo).subscribe({
      next: (value) => {
        this.loadTodos();
      },
      error: (error) => {
        console.error(error);
      }


    });
  }

  onDelete(id: number) {
    this.todoService.removeTodo(id).subscribe(value => {
      this.loadTodos();
    }, error => console.error(error));
  }

  updateStatus(id: number) {
    this.todoService.updateStatus(id).subscribe(() => this.loadTodos());
  }
}
