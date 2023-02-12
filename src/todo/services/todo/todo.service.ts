import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TodoEntity } from '../../entities/todo.entity'
import { CreateTodoDto } from '../../dto/create-todo.dto'
import { UpdateTodoDto } from '../../dto/update-todo.dto'
import { outputFormats } from '../../../constants/date.constant'
import { GetTodoDto } from '../../dto/get-todo.dto'

import format from '../../../utils/date-format'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return await this.todoRepository.save({ ...createTodoDto })
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
    await this.todoRepository.update({ id: updateTodoDto.id }, { ...updateTodoDto })

    return await this.getById(updateTodoDto.id)
  }

  // TODO: Добавить смену формата даты
  async getById(id: number): Promise<TodoEntity | null> {
    return await this.todoRepository.findOne({
      where: {
        id,
      },
    })
  }

  async getAll(): Promise<GetTodoDto[]> {
    const items = await this.todoRepository.find({
      order: {
        id: 'desc',
      },
    })

    return items.map((todo) => ({
      ...todo,
      ...{
        updatedAt: format(todo.updatedAt, outputFormats.dateAndTime) as string,
        createdAt: format(todo.createdAt, outputFormats.dateAndTime) as string,
      },
    })) as GetTodoDto[]
  }

  async delete(id: number): Promise<number> {
    await this.todoRepository.delete({ id })

    return id
  }
}
