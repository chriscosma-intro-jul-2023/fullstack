import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './components/entry/entry.component';
import { ListComponent } from './components/list/list.component';
import { TodoListEntryModel, TodoListItemModel } from './models';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  imports: [CommonModule, EntryComponent, ListComponent],
})
export class TodosComponent {
  todoList: TodoListItemModel[] = [];

  onItemAdded(candidate: TodoListEntryModel) {
    const newItem: TodoListItemModel = {
      description: candidate.description,
      status: 'Later',
      id: '99',
    };

    this.todoList = [newItem, ...this.todoList];
  }
}
