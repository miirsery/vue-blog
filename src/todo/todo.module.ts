import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TodoEntity } from './entities/todo.entity'
import { TodoService } from './services/todo/todo.service'
import { TodoResolver } from './resolvers/todo/todo.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
