import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT ?? 8000;

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://3k01w00c-8000.asse.devtunnels.ms',
    ],
    // origin: 'https://3k01w00c-8000.asse.devtunnels.ms/',
    credentials: true,
  });
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
