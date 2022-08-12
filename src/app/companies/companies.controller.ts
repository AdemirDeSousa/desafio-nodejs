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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('api/v1/companies')
@UseGuards(AuthGuard('jwt'))
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() data: CreateCompanyDto) {
    return this.companiesService.create(data);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    return this.companiesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }

  @Post(':id/check-in')
  checkIn(@Param('id') id: string, @Body() data: CreateHistoricDto) {
    return this.companiesService.checkIn(id, data);
  }

  @Post(':id/check-out')
  checkOut(@Param('id') id: string, @Body() data: CreateHistoricDto) {
    return this.companiesService.checkOut(id, data);
  }

  @Get(':id/reports')
  reports(@Param('id') id: string) {
    return this.companiesService.reports(id);
  }
}
