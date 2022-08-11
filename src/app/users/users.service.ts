import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepo.find({
      select: ['id', 'name', 'email'],
    });
  }

  async findOne(id: string) {
    try {
      return await this.usersRepo.findOneOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Nenhum usuário encontrado');
    }
  }

  async create(data: CreateUserDto) {
    const user = await this.usersRepo.create(data);

    return await this.usersRepo.save(user);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepo.merge(user, data);
    return await this.usersRepo.save(user);
  }

  async delete(id: string) {
    await this.findOne(id);
    this.usersRepo.delete({ id });
  }
}
