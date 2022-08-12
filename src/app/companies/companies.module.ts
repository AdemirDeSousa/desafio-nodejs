import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesEntity } from './entities/companies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricsEntity } from './entities/historics.entity';
import { VehiclesService } from '../vehicles/vehicles.service';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompaniesEntity, HistoricsEntity]),
    VehiclesModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
