import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  let httpsOptions = null;

  if (process.env.ENVIRONMENT !== 'development') {
    httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'server.key')),
      cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'server.cert')),
    };
  }

  if (process.env.ENVIRONMENT !== 'production') {
    httpsOptions = {
      key: fs.readFileSync(
        '/etc/letsencrypt/live/api.reports.dmit.ar/privkey.pem',
      ),
      cert: fs.readFileSync(
        '/etc/letsencrypt/live/api.reports.dmit.ar/fullchain.pem',
      ),
    };
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
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

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://www.dmit.ar',
      'https://dmit.ar',
      'https://api.dmit.ar',
    ], // Permitir solo estos orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    credentials: true,
    // Permitir credenciales (cookies, etc.)
  });
  await app.listen(3000);
}
bootstrap();
