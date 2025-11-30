import { Controller, Get, Query } from '@nestjs/common';
import { RedisTestService } from './redis.service';

@Controller('redis-test')
export class RedisTestController {
  constructor(private readonly redisTestService: RedisTestService) {}

  // Endpoint test set & get
  @Get('set-get')
  async testSetGet(@Query('key') key: string, @Query('value') value: string) {
    console.log(1);
    const result = await this.redisTestService.setAndGet(key, value, 60);
    return { key, value: result };
  }

  // Endpoint test delete
  @Get('delete')
  async testDelete(@Query('key') key: string) {
    const result = await this.redisTestService.deleteKey(key);
    return { key, deleted: result };
  }
}
