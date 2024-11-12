import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/Post.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { hashingPassword } from '../util/bcryptUtil';

@Injectable()
export class GraphqlService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}

  async getPosts(): Promise<PostEntity[]> {
    return await this.postRepo.find();
  }

  async createPost(createPostDto: CreatePostInput): Promise<PostEntity> {
    const newPost = new PostEntity();
    newPost.title = createPostDto.title;
    newPost.author = createPostDto.author;
    newPost.content = createPostDto.content;
    newPost.password = await hashingPassword(createPostDto.password);
    return await this.postRepo.save(newPost);
  }
}
