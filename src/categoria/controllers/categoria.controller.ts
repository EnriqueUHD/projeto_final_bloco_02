import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';

@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get('/produto/:produto')
  @HttpCode(HttpStatus.OK)
  findByProduto(@Param('produto') produto: string): Promise<Categoria[]> {
    return this.categoriaService.findByProduto(produto);
  }

  @Get('/categoria/:nomeCategoria')
  @HttpCode(HttpStatus.OK)
  findByNomeCategoria(
    @Param('nomeCategoria') nomeCategoria: string,
  ): Promise<Categoria[]> {
    return this.categoriaService.findByNomeCategoria(nomeCategoria);
  }

  @Get('/preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoOrdenado(
    @Query('ordem') ordem: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Categoria[]> {
    return this.categoriaService.findByPrecoOrdenado(ordem);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
  }
}
