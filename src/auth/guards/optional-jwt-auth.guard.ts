import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  // Цей метод обробляє результат валідації токена
  handleRequest(err, user, info) {
    // Якщо є помилка або користувача не знайдено, ми НЕ викидаємо помилку,
    // а просто повертаємо null. Запит піде далі.
    if (err || !user) {
      return null;
    }
    return user;
  }
}