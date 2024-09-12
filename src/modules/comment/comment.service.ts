import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCommentBodyDto,
  CreateCommentQueryDto,
  CreateCommentResponseDto,
} from './dto/create-comment.dto';
import { KeywordsService } from '../keywords/keywords.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../entities/Post.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from '../../entities/Comments.entity';
import {
  CommentSearchDataDto,
  CommentSearchDto,
  CommentSearchResponseDto,
} from './dto/read-comment.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentService {
  constructor(
    private readonly keywordService: KeywordsService,
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async create(
    createCommentQueryDto: CreateCommentQueryDto,
    createCommentBodyDto: CreateCommentBodyDto,
  ): Promise<CreateCommentResponseDto> {
    const { postId, parentCommentId = null } = createCommentQueryDto;
    const { content, author } = createCommentBodyDto;
    let parentCommentItem = null;
    const postItem = await this.postRepo.findOne({
      where: {
        postId,
      },
    });
    if (!postItem) {
      throw new NotFoundException(`Post with ID ${postId} 없음`);
    }
    if (parentCommentId) {
      parentCommentItem = await this.commentRepo.findOne({
        where: {
          commentId: parentCommentId,
        },
      });
      if (!parentCommentItem) {
        throw new NotFoundException(
          `Parent Comment with ID ${parentCommentId} 없음`,
        );
      }
    }
    if (postItem) {
      const newCommentItem = new CommentEntity();
      newCommentItem.postId = postItem.postId;
      newCommentItem.parentCommentId = parentCommentId;
      newCommentItem.author = author;
      newCommentItem.content = content;

      const commentItem = await this.commentRepo.save(newCommentItem);
      void this.keywordService.findKeywordOwnerByComment(commentItem);
      return { commentId: commentItem.commentId, message: '댓글 생성 성공' };
    }
  }

  async findAll(commentSearchDto: CommentSearchDto) {
    const {
      postId,
      parentCommentId = null,
      page = 1,
      limit = 10,
    } = commentSearchDto;
    const postItem = await this.postRepo.findOne({
      where: {
        postId,
      },
    });
    if (!postItem) {
      throw new NotFoundException(`Post with ID ${postId} 없음`);
    }
    if (parentCommentId) {
      const parentCommentItem = await this.commentRepo.findOne({
        where: {
          commentId: parentCommentId,
        },
      });
      if (!parentCommentItem) {
        throw new NotFoundException(
          `Parent Comment with ID ${parentCommentId} 없음`,
        );
      }
    }
    const query = this.commentRepo
      .createQueryBuilder('post')
      .andWhere('post_id = :postId', {
        postId,
      })
      .orderBy('post.created_at', 'DESC');
    if (parentCommentId) {
      query.andWhere('parent_comment_id = :parentCommentId', {
        parentCommentId,
      });
    }
    const count = await query.getCount();

    const item = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const result = plainToInstance(CommentSearchDataDto, item, {
      excludeExtraneousValues: true,
    });
    return plainToInstance(CommentSearchResponseDto, {
      page: Number(page),
      total: count,
      limit: Number(limit),
      maxPage: Math.ceil(count / Number(limit)),
      results: result,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }
}
