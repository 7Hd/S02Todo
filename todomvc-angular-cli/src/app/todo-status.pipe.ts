import { Pipe, PipeTransform } from '@angular/core';

import { Todo, TodoStatus } from './models';

@Pipe({
  name: 'todoStatus'
})
export class TodoStatusPipe implements PipeTransform {

  transform(todoList: Todo[], status?: TodoStatus): any {
    if (!status || !todoList) { return todoList; }
    return todoList.filter(todo => todo.status === status);
  }

}
