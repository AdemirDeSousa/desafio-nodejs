import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HistoricsEntity } from './historics.entity';

@Entity()
export class CompaniesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ name: 'qty_vacancies_motorcycles' })
  qtdVacanciesMotorcycles: number;

  @Column({ name: 'actual_qtd_motorcycles', default: 0 })
  actualQtdMotorcycles: number;

  @Column({ name: 'qty_vacancies_cars' })
  qtdVacanciesCars: number;

  @Column({ name: 'actual_qtd_cars', default: 0 })
  actualQtdCars: number;

  @OneToMany(() => HistoricsEntity, (historic) => historic.company)
  historic: HistoricsEntity[];

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
