import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  oldPrice: number;

  @Column({ default: 0 })
  rating: number; // від 1 до 5

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 'New' }) // Наприклад, для бейджів "Новинка"
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}
