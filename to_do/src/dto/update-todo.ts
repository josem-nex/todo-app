import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { TodoStatus } from 'src/entity/todo.entity';
@InputType()
export class updateTodoDto {
  @IsNotEmpty()
  @Field()
  todoID: number; /* 
  @IsNotEmpty()
  @Field()
  title: string;
  @IsNotEmpty()
  @Field()
  description: string; */
  @IsNotEmpty()
  @Field()
  status: TodoStatus;
}
