import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { NotFoundException } from '@nestjs/common';
import { Delete } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'Products list',
      products,
    });
  }

  @Get('/:productID')
  async getProduct(@Param('productID') id, @Res() res) {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'Product successfully',
      product,
    });
  }

  @Post('/create')
  async saveProduct(@Body() createProductDTO: CreateProductDTO, @Res() res) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'Product successfully created',
      product,
    });
  }

  @Put('/update')
  async updateProduct(
    @Body() createProductDTO: CreateProductDTO,
    @Query('productID') productID,
    @Res() res,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'Product successfully updated',
      product: updatedProduct,
    });
  }

  @Delete('/delete')
  async deleteProduct(@Query('productID') id, @Res() res) {
    const product = await this.productService.deleteProduct(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'Product successfully deleted',
      product,
    });
  }
}
