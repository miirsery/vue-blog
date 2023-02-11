import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../../entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../../dto/create-user.dto'
import { UpdateUserDto } from '../../dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save({ ...createUserDto })
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity | null> {
    await this.userRepository.update({ id: updateUserDto.id }, { ...updateUserDto })

    return await this.getById(updateUserDto.id)
  }

  async getById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    })
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async delete(id: number): Promise<number> {
    await this.userRepository.delete({ id })

    return id
  }
}
