import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Create
  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  // Read All
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ order: { createdAt: 'DESC' } });
  }

  // Read One
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Товар з ID ${id} не знайдено`);
    return product;
  }

  // Update
  async update(id: number, updateData: Partial<Product>): Promise<Product> {
    await this.findOne(id); // перевіряємо чи існує
    await this.productRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Delete
  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Товар з ID ${id} не знайдено`);
    }
  }

  async search(query: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { title: ILike(`%${query}%`) },
      take: 10,
    });
  }
}