import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "./entities/favorite.entity";
import { Repository } from "typeorm";

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async toggleFavorite(userId: number, productId: number) {
    // Перевіряємо, чи вже є в обраному
    const existing = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existing) {
      // Якщо є — видаляємо (Remove)
      await this.favoriteRepository.remove(existing);
      return { added: false };
    }

    // Якщо немає — додаємо (Add)
    const favorite = this.favoriteRepository.create({
      user: { id: userId },
      product: { id: productId },
    });
    await this.favoriteRepository.save(favorite);
    return { added: true };
  }

  async getMyFavorites(userId: number) {
    return this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['product'], // Щоб отримати дані про товар
    });
  }
}
