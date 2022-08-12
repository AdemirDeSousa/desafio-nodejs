import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesEntity } from './entities/companies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
