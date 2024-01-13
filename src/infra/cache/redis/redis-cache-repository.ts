import { Injectable } from '@nestjs/common'
import { CacheRepository } from '../cache-repository'
import { RedisService } from './redis.service'

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  private expirationCache = 60 * 15 // 15 minutes

  constructor(private redis: RedisService) {}

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', this.expirationCache)
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key)
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
