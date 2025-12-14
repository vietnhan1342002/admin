import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { BannerRepository } from './repositories/banner.repository';
import { BannerMapper } from './mapper/banner.mapper';
import { Banner } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService, BannerRepository, BannerMapper],
  exports: [BannerService],
})
export class BannerModule {}
