import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
/**
 * La clase to-do con las especificaciones necesarias
 * Longitud máxima del titulo es 15 caracteres
 * No puede estar vacio el titulo ni la descripcion
 * decoradores de class-validator
 **/
// @ObjectType()
@InputType()
export class CreateTodoDto {
  @MinLength(3, { message: 'Title is too short' })
  @MaxLength(15, { message: 'Title is too long' })
  @IsNotEmpty({ message: 'Title is required' })
  @Field()
  title: string;

  @MaxLength(400, { message: 'Description is too long' })
  @IsNotEmpty({})
  @Field({ nullable: true })
  description: string;

  /* @IsDate()
  @IsOptional()
  createdDate; */
}
