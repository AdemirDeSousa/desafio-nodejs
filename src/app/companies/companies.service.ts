import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiclesService } from '../vehicles/vehicles.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesEntity } from './entities/companies.entity';
import { HistoricsEntity } from './entities/historics.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private readonly companiesRepo: Repository<CompaniesEntity>,
    @InjectRepository(HistoricsEntity)
    private readonly historicsRepo: Repository<HistoricsEntity>,
    @Inject(VehiclesService)
    private readonly vehiclesService: VehiclesService,
  ) {}

  async create(data: CreateCompanyDto) {
    const existCompany = await this.companiesRepo.findOne({
      cnpj: data.cnpj,
    });

    if (existCompany) {
      throw new BadRequestException(['cnpj já cadastrado']);
    }

    const company = await this.companiesRepo.create(data);

    return await this.companiesRepo.save(company);
  }

  async findAll() {
    return await this.companiesRepo.find({
      select: ['id', 'name', 'cnpj', 'address'],
    });
  }

  async findOne(id: string) {
    try {
      return await this.companiesRepo.findOneOrFail(
        { id },
        {
          select: [
            'id',
            'name',
            'cnpj',
            'address',
            'phone',
            'qtdVacanciesMotorcycles',
            'qtdVacanciesCars',
            'actualQtdMotorcycles',
            'actualQtdCars',
          ],
        },
      );
    } catch (error) {
      throw new NotFoundException('Nenhuma empresa encontrado');
    }
  }

  async update(id: string, data: UpdateCompanyDto) {
    const company = await this.findOne(id);
    this.companiesRepo.merge(company, data);
    return await this.companiesRepo.save(company);
  }

  async remove(id: string) {
    await this.findOne(id);
    this.companiesRepo.delete({ id });
  }

  async checkIn(id: string, data: CreateHistoricDto) {
    const company = await this.findOne(id);

    const vehicle = await this.vehiclesService.findByLicensePlante(
      data.licensePlate,
    );

    try {
      const historic = await this.historicsRepo.create({
        type: 'entrada',
        company: company,
        vehicle: vehicle,
      });

      await this.historicsRepo.save(historic);

      return {
        message: 'Check-in realizado com sucesso',
      };
    } catch (error) {
      throw new Error('Falha ao realizar check-in');
    }
  }

  async checkOut(id: string, data: CreateHistoricDto) {
    const company = await this.findOne(id);

    const vehicle = await this.vehiclesService.findByLicensePlante(
      data.licensePlate,
    );

    try {
      const historic = await this.historicsRepo.create({
        type: 'saida',
        company: company,
        vehicle: vehicle,
      });

      await this.historicsRepo.save(historic);

      return {
        message: 'Check-out realizado com sucesso',
      };
    } catch (error) {
      throw new Error('Falha ao realizar check-out');
    }
  }

  async reports(id: string) {
    const company = await this.findOne(id);

    const historics = await this.historicsRepo.count({
      where: { company },
      relations: ['vehicle'],
    });

    const historicsCheckInByHour = await this.historicsRepo
      .createQueryBuilder('historics')
      .select('HOUR(historics.createdAt) Horário')
      .addSelect('COUNT(historics.id)', 'quantidade')
      .where('historics.type = :type', { type: 'entrada' })
      .groupBy('HOUR(historics.createdAt)')
      .getRawMany();

    const historicsCheckOutByHour = await this.historicsRepo
      .createQueryBuilder('historics')
      .where('historics.companyId = :companyId', { companyId: company.id })
      .select('HOUR(historics.createdAt) Horário')
      .addSelect('COUNT(historics.id)', 'quantidade')
      .where('historics.type = :type', { type: 'saida' })
      .groupBy('HOUR(historics.createdAt)')
      .getRawMany();

    return {
      'Entradas e Saidas': historics,
      'Entradas por hora': historicsCheckInByHour,
      'Saídas por hora': historicsCheckOutByHour,
    };
  }
}
