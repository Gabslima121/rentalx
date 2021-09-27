import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CategoryModel } from './CategoryModel';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @ManyToOne(() => CategoryModel)
  @JoinColumn({ name: 'category_id' })
  category: CategoryModel;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}

export { Car };
