import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/Todo';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  constructor(private todoService : TodoService) { }

  ngOnInit() {
    // since getTodos is Observable, we need to subscribe to it to get 
    // the data.
    this.todoService.getTodos().subscribe(theHttptodos => {
      this.todos = theHttptodos; 
    });
  }

  deleteTodo(todo:Todo) {
    // Delete on ui.
    this.todos = this.todos.filter( t => t.id !== todo.id);

    // Deletion on server.
    this.todoService.deleteTodo(todo).subscribe();
    console.log('Delete me !! ');
  }

  addTodo(todo: Todo) {
    // post request to server through service .
    this.todoService.addTodo(todo).subscribe(addedTodo => {
      this.todos.push(addedTodo);
    })

    // add to ui.
  }

}
