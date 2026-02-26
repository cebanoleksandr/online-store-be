import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getMyCart(@Request() req) {
    return this.cartService.getMyCart(req.user.userId);
  }

  @Post('add')
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(
      req.user.userId, 
      addToCartDto.productId, 
      addToCartDto.quantity
    );
  }

  @Delete(':id')
  async removeFromCart(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
