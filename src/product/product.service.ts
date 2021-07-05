import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProduct(productID: string): Promise<Product> {
    const product = await this.productModel.findById(productID);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = new this.productModel(createProductDTO);
    return await newProduct.save();
  }

  async updateProduct(
    productID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );

    return updatedProduct;
  }

  async deleteProduct(productID: string): Promise<Product> {
    const deleteProduct = await this.productModel.findByIdAndDelete(productID);
    return deleteProduct;
  }
}
