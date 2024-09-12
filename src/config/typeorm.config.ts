import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    timezone: 'Asia/Seoul',
    host: configService.get<string>('DB_HOSTNAME') || 'localhost',
    port: parseInt(configService.get<string>('DB_PORT')) || 3306,
    username: configService.get<string>('DB_USERNAME') || 'postgres',
    password: configService.get<string>('DB_PASSWORD') || '0000',
    database: configService.get<string>('DB_DATABASE') || 'postgres',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize:
      configService.get<string>('DB_SYNCHRONIZE') === 'true' || false,
  };
};
