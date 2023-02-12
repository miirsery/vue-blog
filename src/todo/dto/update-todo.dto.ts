import { Field, InputType } from '@nestjs/graphql'
import { StatusType } from '../types/todo.type'

@InputType()
export class UpdateTodoDto {
  @Field()
  id: number

  @Field()
  text: string

  @Field({ nullable: false })
  status: StatusType
}
