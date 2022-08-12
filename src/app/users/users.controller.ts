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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listagem de Usuários' })
  async get() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Buscar Usuário pelo Id' })
  async getOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo Usuário' })
  async post(@Body() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Atualizar Usuário pelo Id' })
  async put(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir Usuário pelo Id' })
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
  }
}
