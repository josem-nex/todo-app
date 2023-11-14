import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Esta es la tabla de la base de datos con los to-do
 * Contiene ID, titulo, descripcion y estado actual del to-do
 **/
@Entity('todos')
@ObjectType()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;
  @Column()
  @Field()
  title: string;
  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description?: string;
  @Column()
  @Field()
  status: TodoStatus;
}
export enum TodoStatus {
  OPEN = 'OPEN',
  WIP = 'WIP', //work in progress
  COMPLETED = 'COMPLETED',
}
