import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { apiGlobalPrefix, projectConfig } from './app/configs/project.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(apiGlobalPrefix);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const { port } = projectConfig.api;
  await app.listen(port, () => {
    Logger.log(`Server running on http://localhost:${port}/${apiGlobalPrefix}`);
  });
}
bootstrap();
