import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 80, nullable: false })
  @ApiProperty()
  nomeCategoria: string;

  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  produto: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: false })
  @ApiProperty()
  preco: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  descricao: string;

  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  @ApiProperty()
  estoque: number;
}
