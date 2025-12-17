import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoria)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return categoria;
  }

  async findByProduto(produto: string): Promise<Categoria[]> {
    const nomeProduto = await this.categoriaRepository.find({
      where: {
        produto: ILike(`%${produto}%`),
      },
    });

    if (nomeProduto.length === 0)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return nomeProduto;
  }
}
