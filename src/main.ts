import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_API_DOCS)
    .setDescription('Documentation for the dmit reports API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  //app.enableCors();
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://www.dmit.ar',
      'https://dmit.ar',
      'https://api.dmit.ar',
      'https://facturador.dmit.ar',
      'https://www.facturador.dmit.ar',
    ], // Permitir solo estos orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: [
      'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization',
    ], // Cabeceras permitidas
    credentials: true,
    // Permitir credenciales (cookies, etc.)
  });
  await app.listen(3000);
}
bootstrap();
