import { Component, OnInit } from '@angular/core';

import { Todo, TodoStatus } from './models';
import { generateId } from './mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todoList: Todo[] = [
    new Todo({
      id: generateId(),
      name: 'Taste JavaScript',
      status: TodoStatus.Completed,
    }),
    new Todo({
      id: generateId(),
      name: 'Buy a unicorn',
      status: TodoStatus.Active,
    }),
  ];

  newName: string;
  filterStatus: TodoStatus | undefined;

  constructor() { }

  ngOnInit() { }

  select(todo: Todo, input: HTMLInputElement) {
    if (todo.isCompleted) { return; }
    todo.selected = true;
    this.newName = todo.name;
    setTimeout(() => input.focus(), 0);
  }

  rename(todo: Todo, newName: string) {
    todo.name = newName;
    todo.selected = false;
  }

  createNewTodo(input: HTMLInputElement) {
    this.todoList.push(new Todo({
      id: generateId(),
      name: input.value,
      status: TodoStatus.Active,
    }));
    input.value = '';
  }

  clearCompleted() {
    this.todoList = this.todoList.filter(todo => !todo.isCompleted);
  }

  showAll() { this.filterStatus = undefined; }
  showActive() { this.filterStatus = TodoStatus.Active; }
  showCompleted() { this.filterStatus = TodoStatus.Completed; }

  get isShowAll() { return !this.filterStatus; }
  get isShowActive() { return this.filterStatus === TodoStatus.Active; }
  get isShowCompleted() { return this.filterStatus === TodoStatus.Completed; }

  get leftTodo() {
    return this.todoList.filter(todo => todo.status === TodoStatus.Active).length;
  }

}
