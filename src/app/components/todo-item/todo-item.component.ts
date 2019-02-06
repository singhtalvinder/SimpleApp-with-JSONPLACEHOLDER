import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  // todo is an input from some component from where we call it .
  @Input() todo: Todo;
  // use output to emit something to the parent component.
  // The deleteTodo below needs to be catched in the parent component.
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();


  constructor(private todoService: TodoService ) { }

  ngOnInit() {
  }

  // Set dynamic classes based on some conditions.
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggle(todo) {
    // toggle on ui
    todo.completed = !todo.completed;

    //toggle on server(basically mimick, we can't delete what we don't own)
    // Will return Observable so we need to subscribe .
    this.todoService.toggleCompleted(todo).subscribe(todoback =>{
      console.log(todoback);
    });


  }

  onDelete(todo) {
    // to delete is tricky since the todos are in component.
    // so we have to emit upwards.
    this.deleteTodo.emit(todo);
    //console.log('Delete');

  }
}
