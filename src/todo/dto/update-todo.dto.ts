import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTodoDto {
  @Field()
  id: number

  @Field()
  text: string

  @Field({ nullable: false })
  status: 'new' | 'onprogress' | 'done'
}
