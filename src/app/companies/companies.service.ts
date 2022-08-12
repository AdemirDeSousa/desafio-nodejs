import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesEntity } from './entities/companies.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private readonly companiesRepo: Repository<CompaniesEntity>,
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
}
