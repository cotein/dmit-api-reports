import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MessagesWebSocketModule } from './messages-web-socket/messages-web-socket.module';
import { BasicReportModule } from './basic-report/basic-report.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [
    // ConfigModule.forRoot() carga las variables de entorno desde un archivo .env.
    ConfigModule.forRoot(),

    // TypeOrmModule.forRoot() configura la conexión a la base de datos PostgreSQL.
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos.
      host: process.env.DB_HOST, // Host de la base de datos.
      port: parseInt(process.env.DB_PORT, 10), // Puerto de la base de datos.
      database: process.env.POSTGRES_DB, // Nombre de la base de datos.
      username: process.env.DB_USERNAME, // Nombre de usuario de la base de datos.
      password: process.env.POSTGRES_PASSWORD, // Contraseña de la base de datos.
      autoLoadEntities: true, // Carga automáticamente las entidades.
      synchronize: true, // Sincroniza automáticamente las entidades con la base de datos.
    }),
    // Importa el módulo de productos.
    ProductsModule,

    // Importa el módulo común.
    CommonModule,

    // Importa el módulo de archivos.
    FilesModule,

    // Importa el módulo de autenticación.
    AuthModule,

    MessagesWebSocketModule,

    BasicReportModule,

    PrinterModule,
  ],
  providers: [],
})
export class AppModule {}
