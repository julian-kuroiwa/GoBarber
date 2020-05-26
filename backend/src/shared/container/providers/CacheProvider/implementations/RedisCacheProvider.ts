import Redis, { Redis as RedisClient } from 'ioredis';
import CacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(CacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async invalidate(key: string): Promise<void> {}

  public async recovery(key: string): Promise<string | null> {
    const data = await this.client.get(key);

    return data;
  }
}

export default RedisCacheProvider;
