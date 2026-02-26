import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product)
  product: Product;
}
