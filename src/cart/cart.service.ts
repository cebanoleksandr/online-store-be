import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "./entities/cart-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
  ) { }

  async addToCart(userId: number, productId: number, quantity: number) {
    let item = await this.cartRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });

    if (item) {
      item.quantity += quantity;
    } else {
      item = this.cartRepository.create({ user: { id: userId }, product: { id: productId }, quantity });
    }
    return this.cartRepository.save(item);
  }

  async getMyCart(userId: number) {
    return this.cartRepository.find({ where: { user: { id: userId } }, relations: ['product'] });
  }

  async remove(id: number) {
    return await this.cartRepository.delete(id);
  }

  async decreaseQuantity(id: number) {
    const item = await this.cartRepository.findOne({ where: { id } });

    if (!item) {
      throw new Error('Товар у кошику не знайдено');
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      return this.cartRepository.save(item);
    } else {
      // Якщо кількість 1, то наступне зменшення видаляє товар
      return this.cartRepository.delete(id);
    }
  }
}
