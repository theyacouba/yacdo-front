import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../core/models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  todos!: Todo[];
  filteredTodo: Todo[] = [];
  newTodo!: string | null;
  done!: Boolean;
  hideTodo: Boolean = false;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAllTodo().subscribe({
      next: (value) => {
        this.todos = value.body.reverse().sort((a, b) => a.isDone > b.isDone ? 1 : -1).sort((a, b) => b.id - a.id);
        if (this.hideTodo) {
          this.filterTodo(this.todos);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onNewTodo() {
    console.log(this.newTodo);
    this.todoService.addTodo(this.newTodo!).subscribe({
      next: (value) => {
        this.loadTodos();
        this.newTodo = null;
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

  onHideTodoChange(event: Event) {
    this.hideTodo = (event.target as HTMLInputElement).checked
    if (this.hideTodo) {
      this.filterTodo(this.todos);
    } else {
      this.loadTodos();
    }
  }

  filterTodo(todos: Todo[]): void {
    this.filteredTodo = [];
    todos.forEach(element => {
      element.isDone ? null : this.filteredTodo.push(element);
    });
    this.todos = this.filteredTodo;
  }
}
