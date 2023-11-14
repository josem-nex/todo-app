import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { TodoComponent } from '../todo/todo.component';
import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_TODOS,
} from '../gql/home.gql';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todos: any = [];
  filteredTodos: any = [];
  constructor(private apollo: Apollo, private dialog: MatDialog) {}

  ngOnInit() {
    this.apollo
      .watchQuery<any>({ query: GET_TODOS })
      .valueChanges.subscribe(({ data }) => {
        this.filteredTodos = data.todos;
        this.todos = data.todos;
      });
  }
  openDialog() {
    const dialogRef = this.dialog.open(TodoComponent, {
      width: '500px',
      hasBackdrop: true,
      role: 'dialog',
      height: '350px',
    });
    //createTodo
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.apollo
        .mutate<any>({
          mutation: CREATE_TODO,
          variables: { data },
          refetchQueries: [GET_TODOS],
        })
        .subscribe();
    });
  }
  filterChanged(event: MatSelectChange) {
    const value = event.value;
    this.filteredTodos = [];
    if (value) {
      for (let index = 0; index < this.todos.length; index++)
        if (value == this.todos[index].status)
          this.filteredTodos.push(this.todos[index]);
    } else this.filteredTodos = this.todos;
  }
  statusChanged(event: MatSelectChange, ID: number) {
    const value = event.value;
    console.log(value);
    const data = { todoID: ID, status: value };
    this.apollo
      .mutate<any>({
        mutation: UPDATE_TODO,
        variables: { data },
        refetchQueries: [GET_TODOS],
      })
      .subscribe();
  }

  delete(todoID: number) {
    if (confirm('Do you want to remove the Todo?')) {
      return this.apollo
        .mutate<any>({
          mutation: DELETE_TODO,
          variables: { id: todoID },
          refetchQueries: [GET_TODOS],
        })
        .subscribe();
    } else {
      return alert('Operation cancelled');
    }
  }
}
