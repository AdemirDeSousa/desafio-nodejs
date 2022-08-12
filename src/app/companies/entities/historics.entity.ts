import { VehiclesEntity } from 'src/app/vehicles/entities/vehicles.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompaniesEntity } from './companies.entity';

@Entity()
export class HistoricsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @ManyToOne(() => CompaniesEntity, (company) => company.historic)
  company: CompaniesEntity;

  @ManyToOne(() => VehiclesEntity, (vehicle) => vehicle.historic)
  vehicle: VehiclesEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
