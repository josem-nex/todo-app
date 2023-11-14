import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/dto/create-todo';
import { TodoEntity, TodoStatus } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}
  /**
   * Devuelve la tabla de la bd
   * la entidad TodoEntity
   **/
  async getAllTodos(): Promise<TodoEntity[]> {
    return await this.repo.find();
  }
  async findTodoById(id: number): Promise<TodoEntity> {
    return await this.repo.findOne({ where: { id } });
  }
  /**
   * Crea un nuevo todo para annadirlo a la base de datos
   **/
  async createTodo(CreateTodoDTO: CreateTodoDto): Promise<TodoEntity> {
    const todo = new TodoEntity();
    const { title, description } = CreateTodoDTO;
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    // todo.date = CreateTodoDTO.createdDate;

    this.repo.create(todo);
    return await this.repo.save(todo);
  }
  /**
   * Actualizar el estado de un to-do
   **/
  async updateStatus(todoID: number, status: TodoStatus) {
    // await this.repo.update({ id }, { status });
    // return this.repo.findOne({ where: { id } });
    // const { todoID /* title, description, */ /* status */ } = data;
    try {
      await this.repo.update({ id: todoID }, { status });
      return await this.repo.findOne({ where: { id: todoID } });
      /* 
      await this.repo.update({ id: todoID }, { status });
      return this.repo.findOne({ where: { id: todoID } }); */
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  /**
   * Eliminar un to-do
   **/
  async delete(id: number) {
    /* const todo = await this.repo.findOne({ where: { id } });
    await this.repo.remove(todo);
    return { deleted: true }; */
    // return await this.repo.delete({ id });
    try {
      return await this.repo.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
