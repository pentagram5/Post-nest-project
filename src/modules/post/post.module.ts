import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostEntity } from '../../entities/Post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordsModule } from '../keywords/keywords.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), KeywordsModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
