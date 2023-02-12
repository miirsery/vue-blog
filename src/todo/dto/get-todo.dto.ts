import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GetTodoDto {
  @Field()
  id: number

  @Field()
  userId: number

  @Field()
  status: string

  @Field()
  text!: string

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}
