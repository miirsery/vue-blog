import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { TodoService } from '../../services/todo/todo.service'
import { TodoEntity } from '../../entities/todo.entity'
import { CreateTodoDto } from '../../dto/create-todo.dto'
import { UpdateTodoDto } from '../../dto/update-todo.dto'
import { GetTodoDto } from '../../dto/get-todo.dto'

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => TodoEntity)
  async createTodo(@Args('createTodo') createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoService.create(createTodoDto)
  }

  @Query(() => [GetTodoDto])
  async getAllTodos(): Promise<GetTodoDto[]> {
    return await this.todoService.getAll()
  }

  @Query(() => TodoEntity)
  async getTodoById(@Args('id') id: number): Promise<TodoEntity | null> {
    return await this.todoService.getById(id)
  }

  @Mutation(() => TodoEntity)
  async updateTodo(@Args('updateTodo') updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
    return this.todoService.update(updateTodoDto)
  }
}
