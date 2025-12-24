import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/exceptions/http-exception.filter';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors
          .map((err) => {
            if (err.constraints) {
              return Object.values(err.constraints);
            }
            return [`Field ${err.property} không hợp lệ`];
          })
          .flat();

        return new BadRequestException({
          message: 'Dữ liệu không hợp lệ',
          errors: messages,
        });
      },
    }),
  );
  app.use(helmet());
  app.use(cookieParser());
  app.use(passport.initialize());

  app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.PORT ?? 8000;

  app.enableCors({
    origin: [
      'http://172.26.35.127:5173',
      // 'http://172.26.35.98:8000',
      'http://localhost:5173',
    ],
    // origin: 'https://3k01w00c-8000.asse.devtunnels.ms/',
    credentials: true,
  });
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
