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
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('api/v1/companies')
@UseGuards(AuthGuard('jwt'))
@ApiTags('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar nova Empresas' })
  create(@Body() data: CreateCompanyDto) {
    return this.companiesService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as Empresas' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Empresa pelo Id' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar Empresa pelo Id' })
  update(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    return this.companiesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar Empresa' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }

  @Post(':id/check-in')
  @ApiOperation({ summary: 'Realizar check-in de Veículo' })
  checkIn(@Param('id') id: string, @Body() data: CreateHistoricDto) {
    return this.companiesService.checkIn(id, data);
  }

  @Post(':id/check-out')
  @ApiOperation({ summary: 'Realizar check-out de Veículo' })
  checkOut(@Param('id') id: string, @Body() data: CreateHistoricDto) {
    return this.companiesService.checkOut(id, data);
  }

  @Get(':id/reports')
  @ApiOperation({ summary: 'Exibir Relatório' })
  reports(@Param('id') id: string) {
    return this.companiesService.reports(id);
  }
}
