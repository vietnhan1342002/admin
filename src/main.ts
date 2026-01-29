import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/exceptions/http-exception.filter';
import passport from 'passport';
import { flattenErrors } from './common/exceptions/flatten-errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true, // 🔥 QUAN TRỌNG
      },
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          message: 'Dữ liệu không hợp lệ',
          errors: flattenErrors(errors),
        });
      },
    }),
  );
  app.use(helmet());
  app.use(cookieParser());
  app.use(passport.initialize());

  app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.PORT ?? 8000;

  const devOrigins = ['http://localhost:5173', 'http://103.75.186.152:5000'];

  const prodOrigins = [
    'https://admin.yourdomain.com',
    'https://yourdomain.com',
  ];
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins,
    credentials: true,
  });
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
