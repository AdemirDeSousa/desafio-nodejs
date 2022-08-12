import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  async post(@Body() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
  }
}
