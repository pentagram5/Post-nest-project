import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostEntity } from '../../entities/Post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, CreatePostResponseDto } from './dto/create-post.dto';
import { comparePassword, hashingPassword } from '../../util/bcryptUtil';
import {
  PostDataResponseDto,
  PostSearchDataDto,
  PostSearchDto,
  PostSearchResponseDto,
} from './dto/read-post.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { KeywordsService } from '../keywords/keywords.service';

@Injectable()
export class PostService {
  constructor(
    private readonly keywordService: KeywordsService,
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<CreatePostResponseDto> {
    const newPost = new PostEntity();
    newPost.title = createPostDto.title;
    newPost.author = createPostDto.author;
    newPost.content = createPostDto.content;
    newPost.password = await hashingPassword(createPostDto.password);
    const item = await this.postRepo.save(newPost);
    void this.keywordService.findKeywordOwnerByPost(newPost);
    return { postId: item.postId, message: '게시글 생성 성공' };
  }

  async findAll(postSearchDto: PostSearchDto): Promise<PostSearchResponseDto> {
    const { author, title, page = 1, limit = 10 } = postSearchDto;
    const query = this.postRepo
      .createQueryBuilder('post')
      .orderBy('post.created_at', 'DESC');

    if (author) {
      query.andWhere('MATCH(post.author) AGAINST(:author IN BOOLEAN MODE)', {
        author,
      });
    }

    if (title) {
      query.andWhere('MATCH(post.title) AGAINST(:title IN BOOLEAN MODE)', {
        title,
      });
    }
    const count = await query.getCount();
    const item = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    const result = plainToInstance(PostSearchDataDto, item, {
      excludeExtraneousValues: true,
    });
    return plainToInstance(PostSearchResponseDto, {
      page: Number(page),
      total: count,
      limit: Number(limit),
      maxPage: Math.ceil(count / Number(limit)),
      results: result,
    });
  }

  async findOne(postId: number): Promise<PostDataResponseDto> {
    const postItem = await this.postRepo.findOne({
      where: {
        postId,
      },
    });
    if (postItem) {
      return plainToClass(PostDataResponseDto, postItem, {
        excludeExtraneousValues: true,
      });
    } else {
      throw new NotFoundException(`Post with ID ${postId} 없음`);
    }
  }

  async update(
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDataResponseDto> {
    const postItem = await this.postRepo.findOne({
      where: {
        postId: postId,
      },
    });
    if (postItem) {
      if (await comparePassword(updatePostDto.password, postItem.password)) {
        await this.postRepo.update(postItem.postId, {
          title: updatePostDto.title,
          author: updatePostDto.author,
          content: updatePostDto.content,
          updatedAt: () => 'CURRENT_TIMESTAMP(6)',
        });
        return plainToClass(
          PostDataResponseDto,
          await this.postRepo.findOne({
            where: {
              postId: postId,
            },
          }),
          {
            excludeExtraneousValues: true,
          },
        );
      } else {
        throw new ForbiddenException('게시글 비밀번호 맞지않음');
      }
    } else {
      throw new NotFoundException(`Post with ID ${postId} 없음`);
    }
  }

  async remove(postId: number, deletePostDto: DeletePostDto) {
    const postItem = await this.postRepo.findOne({
      where: {
        postId: postId,
      },
    });
    if (postItem) {
      if (await comparePassword(deletePostDto.password, postItem.password)) {
        await this.postRepo.delete({ postId: postId });
      } else {
        throw new ForbiddenException('게시글 비밀번호 맞지않음');
      }
    } else {
      throw new NotFoundException(`Post with ID ${postId} 없음`);
    }
  }
}
