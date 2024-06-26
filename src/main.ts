import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infra/common/filter/exception.filter';
import { LoggingInterceptor } from './infra/common/interceptors/logger.interceptor';
import { ResponseFormat, ResponseInterceptor } from './infra/common/interceptors/response.interceptor';
import { LoggerService } from './infra/logger/logger.service';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Authentication', 'Set-Cookie', 'Cache-Control', 'Accept', 'User-Agent'],
    credentials: true,
  });

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  //Apply Guardin JWT all
  // app.useGlobalGuards(new JwtAuthGuard())

  // base routing
  // app.setGlobalPrefix('api_v1');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addCookieAuth()
      .setTitle('Clean Architecture Nestjs')
      .setDescription('Example with todo list')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(8400);
}
bootstrap();
