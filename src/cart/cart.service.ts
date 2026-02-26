import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "./entities/cart-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
  ) {}

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
    await this.cartRepository.delete(id);
  }
}
