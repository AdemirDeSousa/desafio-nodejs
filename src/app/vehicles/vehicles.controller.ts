import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/vehicles')
@UseGuards(AuthGuard('jwt'))
@ApiTags('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo Veículo' })
  create(@Body() data: CreateVehicleDto) {
    return this.vehiclesService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os Veículo' })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Veículo pelo Id' })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar Veículo pelo Id' })
  update(@Param('id') id: string, @Body() data: UpdateVehicleDto) {
    return this.vehiclesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir Veículo pelo Id' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
