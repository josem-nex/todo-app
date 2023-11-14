import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

/**
 * Configuracion para conectar la app con la base de datos
 * modificar el tipo de bd, nombre de la bd,  username y password
 **/
const ormOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'tododb',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  logging: true,
};

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      synchronize: true,
    }),
    TodoModule,
    TypeOrmModule.forRoot(ormOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
