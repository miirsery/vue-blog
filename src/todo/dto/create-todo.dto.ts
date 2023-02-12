import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTodoDto {
  @Field({ nullable: false })
  userId: number

  @Field({ nullable: false })
  text: string
}
