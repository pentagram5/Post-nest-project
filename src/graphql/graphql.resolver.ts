import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlService } from './graphql.service';
import { PostEntity } from '../entities/Post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Resolver(() => PostEntity)
export class GraphqlResolver {
  constructor(private readonly graphqlService: GraphqlService) {}

  @Query(() => [PostEntity])
  getPosts() {
    return this.graphqlService.getPosts();
  }

  @Mutation(() => PostEntity)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PostEntity> {
    return this.graphqlService.createPost(createPostInput);
  }
}
