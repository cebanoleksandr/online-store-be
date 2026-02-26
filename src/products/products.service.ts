import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

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
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  // Update
  async update(id: number, updateData: Partial<Product>): Promise<Product> {
    await this.findOne(id); 
    await this.productRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Delete
  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async search(query: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { title: ILike(`%${query}%`) },
      take: 10,
    });
  }

  async seed() {
    const count = await this.productRepository.count();
    if (count > 0) return { message: 'Database is already populated' };

    const dummyProducts = Array.from({ length: 12 }).map((_, i) => ({
      title: `Product card ${230 + i}x${270 + i}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien et nisl non integer.',
      price: 1200 + i * 150,
      oldPrice: 1500 + i * 150,
      rating: 5,
      imageUrl: `https://via.placeholder.com/230x270?text=Item+${i + 1}`,
      category: i < 4 ? 'New items' : i < 8 ? 'Discounts' : 'Top sellers',
    }));

    await this.productRepository.save(dummyProducts);
    return { message: '12 products have been successfully added!' };
  }
}