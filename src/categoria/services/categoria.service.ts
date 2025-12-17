import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

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

  async findByNomeCategoria(nomeCategoria: string): Promise<Categoria[]> {
    const nome = await this.categoriaRepository.find({
      where: {
        nomeCategoria: ILike(`%${nomeCategoria}%`),
      },
    });

    if (nome.length === 0)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return nome;
  }

  async findByPrecoOrdenado(ordem: 'ASC' | 'DESC'): Promise<Categoria[]> {
    const produtos = await this.categoriaRepository.find({
      order: {
        preco: ordem,
      },
    });

    if (produtos.length === 0)
      throw new HttpException(
        'Nenhum produto encontrado!',
        HttpStatus.NOT_FOUND,
      );
    return produtos;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.categoriaRepository.delete(id);
  }
}
