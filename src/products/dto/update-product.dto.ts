import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  oldPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  rating?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
