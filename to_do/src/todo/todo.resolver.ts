import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoEntity } from 'src/entity/todo.entity';
import { CreateTodoDto } from 'src/dto/create-todo';
import { updateTodoDto } from 'src/dto/update-todo';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
// import { BadRequestException } from '@nestjs/common';
// import { Query } from '@nestjs/common';

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}
  @Query(() => [TodoEntity])
  async todos() {
    return await this.todoService.getAllTodos();
  }
  @Query(() => TodoEntity)
  async todo(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.findTodoById(id);
  }
  @Mutation(() => TodoEntity)
  async createTodo(@Args('todoInput') todoInput: CreateTodoDto) {
    return await this.todoService.createTodo(todoInput);
  }
  @Mutation(() => TodoEntity)
  async deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.delete(id);
  }
  @Mutation(() => TodoEntity)
  async updateStatusTodo(@Args('updateTodo') updateTodo: updateTodoDto) {
    const pipe = new TodoStatusValidationPipe();
    await pipe.transform(updateTodo.status);
    return await this.todoService.updateStatus(
      updateTodo.todoID,
      updateTodo.status,
    );
  }
}
