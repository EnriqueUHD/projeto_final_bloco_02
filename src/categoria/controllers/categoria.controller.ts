import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categoria')
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

  @Get('/nome/:nomeCategoria')
  @HttpCode(HttpStatus.OK)
  findByNomeCategoria(
    @Param('nomeCategoria') nomeCategoria: string,
  ): Promise<Categoria[]> {
    return this.categoriaService.findByNomeCategoria(nomeCategoria);
  }

  @Get('/preco/crescente')
  findByPrecoCrescente() {
    return this.categoriaService.findByPrecoOrdenado('ASC');
  }

  @Get('/preco/decrescente')
  findByPrecoDecrescente() {
    return this.categoriaService.findByPrecoOrdenado('DESC');
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.delete(id);
  }
}
