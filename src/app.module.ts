import { CategoriaModule } from './categoria/categoria.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as mysql from 'mysql2/promise';
import { Categoria } from './categoria/entities/categoria.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const conecao = await mysql.createConnection({
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          user: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
        });

        const dbName = configService.get<string>('DB_NAME');
        await conecao.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);

        await conecao.end();

        return {
          type: configService.get<string>('DB_TYPE') as 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: dbName,
          entities: [Categoria],
          synchronize: true,
        };
      },
    }),
    CategoriaModule,
  ],
})
export class AppModule {}
