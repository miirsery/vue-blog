import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserEntity } from '../../users/entities/user.entity'
import { JoinColumn } from 'typeorm'

@ObjectType()
@Entity('todos')
export class TodoEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: UserEntity

  @Field()
  @Column({ nullable: false })
  userId: number

  @Field()
  @Column({ default: 'new' })
  status?: string

  @Field({ nullable: false })
  @Column()
  text: string

  @Field()
  @CreateDateColumn({
    default: 'NOW()',
  })
  createdAt: Date

  @Field()
  @UpdateDateColumn({
    default: 'NOW()',
  })
  updatedAt: Date
}
