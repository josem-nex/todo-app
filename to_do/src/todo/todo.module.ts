import { Module } from '@nestjs/common';
// import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entity/todo.entity';
import { TodoResolver } from './todo.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  // controllers: [TodoController],
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
