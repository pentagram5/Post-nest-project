import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsEntity } from '../../entities/Keyword.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { KeywordsController } from './keywords.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordsEntity])],
  controllers: [KeywordsController],
  providers: [KeywordsService],
  exports: [KeywordsService],
})
export class KeywordsModule {}
