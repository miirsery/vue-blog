import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserService } from '../../services/user/user.service'
import { UserEntity } from '../../entities/user.entity'
import { CreateUserDto } from '../../dto/create-user.dto'
import { UpdateUserDto } from '../../dto/update-user.dto'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(@Args('createUser') createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto)
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args('updateUser') updateUserDto: UpdateUserDto): Promise<UserEntity | null> {
    return await this.userService.update(updateUserDto)
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAll()
  }

  @Query(() => UserEntity)
  async getUserById(@Args('id') id: number): Promise<UserEntity | null> {
    return await this.userService.getById(id)
  }

  @Mutation(() => Number)
  async deleteUser(@Args('id') id: number): Promise<number> {
    return await this.userService.delete(id)
  }
}
