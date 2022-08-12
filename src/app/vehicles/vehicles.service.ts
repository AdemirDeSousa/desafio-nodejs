import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesEntity } from './entities/vehicles.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehiclesEntity)
    private readonly vehiclesRepo: Repository<VehiclesEntity>,
  ) {}

  async create(data: CreateVehicleDto) {
    const existVehicle = await this.vehiclesRepo.findOne({
      licensePlate: data.licensePlate,
    });

    if (existVehicle) {
      throw new BadRequestException(['Placa já cadastrada']);
    }

    const vehicle = await this.vehiclesRepo.create(data);

    return await this.vehiclesRepo.save(vehicle);
  }

  async findAll() {
    return await this.vehiclesRepo.find({
      select: ['id', 'licensePlate', 'brand', 'color', 'model', 'type'],
    });
  }

  async findOne(id: string) {
    try {
      return await this.vehiclesRepo.findOneOrFail(
        { id },
        {
          select: ['id', 'licensePlate', 'brand', 'color', 'model', 'type'],
        },
      );
    } catch (error) {
      throw new NotFoundException('Nenhum veículo encontrado');
    }
  }

  async update(id: string, data: UpdateVehicleDto) {
    const vehicle = await this.findOne(id);
    this.vehiclesRepo.merge(vehicle, data);
    return await this.vehiclesRepo.save(vehicle);
  }

  async remove(id: string) {
    await this.findOne(id);
    this.vehiclesRepo.delete({ id });
  }
}
