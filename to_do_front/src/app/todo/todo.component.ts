import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  title!: string;
  description!: string;
  constructor(public dialogRef: MatDialogRef<TodoComponent>) {}

  ngOnInit(): void {}

  onCancel() {
    this.dialogRef.close();
  }
  create() {
    this.dialogRef.close({ title: this.title, description: this.description });
  }
}
