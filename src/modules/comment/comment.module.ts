import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../../entities/Post.entity';
import { KeywordsModule } from '../keywords/keywords.module';
import { CommentEntity } from '../../entities/Comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CommentEntity]),
    KeywordsModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
