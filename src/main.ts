import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { LogRequestMiddleware } from './common/middleware/LogRequestMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Access Swagger UI at /api
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Logging Middleware
  app.use(new LogRequestMiddleware().use);
  await app.listen(3000);
}
bootstrap();
