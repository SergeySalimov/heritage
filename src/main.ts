import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const ENV = process.env.NODE_ENV || 'production';
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Heritage app')
    .setDescription('REST API documentation')
    .setVersion(process.env.npm_package_version)
    .addTag('Heritage')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  await app.listen(
    PORT,
    () => Logger.verbose(`Server started on port = ${PORT}, in ${ENV.toUpperCase()} mode, version: ${process.env.npm_package_version}`),
  );
}

bootstrap();
