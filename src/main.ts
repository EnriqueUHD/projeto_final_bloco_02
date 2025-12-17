import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Farmácia dos Brabos')
    .setDescription(`A farmácia que só quem compra é brabo!\n\n 
      Responsáveis: Enrique Andreazza, Murilo Scapim, Geandro Araujo`)
    .setContact(
      'Brabos Farma',
      'http://www.brabosfarma.online',
      'brabos_farma@email.com',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
