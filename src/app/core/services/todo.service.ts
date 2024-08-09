import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoResponse } from '../interfaces/todo-response';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl: string = 'http://localhost:8080/todos';
  constructor(private http: HttpClient) { }

  addTodo(formValue: string): Observable<any> {
    const todo = new Todo(formValue, false);
    return this.http.post(`${this.apiUrl}/new`, todo);
  }

  getAllTodo(): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(this.apiUrl);
  }

  removeTodo(todoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${todoId}/delete`);
  }

  updateStatus(id: number): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/status/${id}`, null);

  }

}
