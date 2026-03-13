import { Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FavoritesService } from "./favorites.service";

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(@Request() req) {
    return this.favoritesService.getMyFavorites(req.user.userId);
  }

  @Post(':productId')
  async toggle(@Request() req, @Param('productId') productId: string) {
    return this.favoritesService.toggleFavorite(req.user.userId, +productId);
  }
}