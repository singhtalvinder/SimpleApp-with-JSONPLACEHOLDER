import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // The next statement to fetch will return all (approx 200)
  // todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  // so to limit that to any count we use the following form of the same above.
  //todosUrl:string = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
  // also, we don't want to include it here so reuse the original form  and create
  // a property for the linit value as: todosLimit: '?_limit=5'
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  constructor(private http: HttpClient) {

   }

   // Fetch/get Todos.
   getTodos(): Observable<Todo[]> {
    // Generally here the data will come from some api , backend db.
    // Right now, w'll make a request to the jsonplaceholder for todos.
    // use the url and limit as below:
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`); //will return an observable.
  }

  // Add a todo.
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions); //will return an observable.
  }
  //Toggle completed.
  // Put request for updating on server.
  toggleCompleted(todo:Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  //Delete a todo item.
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }
}
