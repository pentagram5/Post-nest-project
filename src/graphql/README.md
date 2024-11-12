## GraphQL vs REST API

### 오버패칭(Over-fetching) vs 언더패칭(Under-fetching)

| **특징**                   | **GraphQL**                                                             | **REST API**                                                                                                                 |
|--------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **오버패칭(Over-fetching)**  | - 클라이언트가 요청한 데이터만 가져올 수 있음. <br> - 필요 없는 데이터는 받지 않음.                    | - REST API에서 응답은 고정된 형태로, 불필요한 데이터도 포함될 수 있음. <br> 예: 사용자의 정보가 포함된 응답에서 불필요한 `profileImage`, `friendsList` 등의 데이터도 포함될 수 있음. |
| **언더패칭(Under-fetching)** | - 하나의 요청에서 필요한 모든 데이터를 한 번에 조회 가능. <br> - 클라이언트는 정확히 필요한 데이터만 요청할 수 있음. | - 여러 번의 요청이 필요할 수 있음. <br> 예: 사용자의 상세 정보를 얻으려면 `/users/{id}`와 `/users/{id}/profile`을 각각 호출해야 할 수 있음.                         |

# GraphQL 모듈 추가 테스트

## 설명

- nestjs/graphql 패키지를 활용하여, Nest 프로젝트 내에서, graphQL 모듈을 추가해봅니다.
- 기존 RestAPI에 구현된 Post 서비스를 graphQL API - 조회, 생성하는 Resolver로 구현해봅니다.

## GraphQL 설정

### 패키지 설치

```bash
npm install @nestjs/graphql graphql-tools graphql @apollo/server @nestjs/apollo
```

- Apollo Server 패키지를 활용해 GraphQl driver를 AplloDriver를 활용하도록 합니다.

### app.module 설정

```typescript
//app.module.ts 
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphqlNestModule } from './graphql/graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    })
    , GraphqlNestModule,
  ]
})
```

- Nest root app.module파일에 GraphQL 모듈을 imports단에 설정
- autoSchemaFile은 @ObjectType(), @InputType(), @Field()와 같은 데코레이터를 사용하여 작성된 엔티티 및 DTO의 구조를 기반으로 하여 GraphQL 스키마를 자동생성합니다.
- resolver를 포함하여 생성한 GraphQL(GraphqlNestModule) 모듈은 기타 RestAPI로 구현되어 사용하는 다른 모듈과 같이 imports단에 넣어줍니다.

### Resolver 선언

```typescript
//graphql.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlService } from './graphql.service';
import { PostEntity } from '../entities/Post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Resolver(() => PostEntity)
export class GraphqlResolver {
  constructor(private readonly graphqlService: GraphqlService) {
  }

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
```

- 선언한 클래스 내부의 @Query, @Mutation 데코레이터가 사용된 각 메서드 명이 실질적으로 GraphQL 쿼리요청 필드명이 됩니다.
- 각 데코레이터 별로 리턴할 데이터 타입 dto 혹은 entity를 연동해줍니다.

### 엔티티, dto 설정

```typescript
///Post.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() // GraphQL에서 사용할 수 있도록 추가
@Entity('post')
export class PostEntity {
  @Field(() => Int, { description: '게시글 고유 ID' }) // GraphQL에서 타입을 정의
  @PrimaryGeneratedColumn({ name: 'post_id', comment: '게시글 고유 id' })
  postId: number; // 자동 증가 ID

  @Field({ description: '게시글 제목' }) // GraphQL에서 이 필드가 사용할 수 있도록 노출
  @Index('TITLE_FULLTEXT_INDEX', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'varchar', length: 255, comment: '게시글 제목' })
  title: string; // 게시글 제목
}
```

- 정말 편하게도, 기존 RestAPI 모듈에서 사용한 typeORM 엔티티에, @ObjectType를 데코레이터로 사용해주면 GraphQL에서도 사용가능하게 됩니다.
- 각 필드들을 GraphQL에서도 사용하고자 한다면 @Filed 데코레이터를 작성해주면됩니다.(패스워드 같은 경우 데이터 조회시 제공되면 안되기 때문에 데코레이터를 생략해주면 그만!)

```typescript
// graphql/dto/create-post.input.ts
import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty({
    message: '게시글 제목은 필수 항목입니다.',
  })
  @IsString({
    message: '게시글 제목은 스트링타입만 가능합니다.',
  })
  @MaxLength(255, {
    message: '게시글 제목은 255글자를 넘길 수 없습니다.',
  })
  title: string;
}
```

- 마찬가지로 Post 생성과 같은 Mutation 쿼리의 경우, 특정한 dto가 필요하다면 위와 같이 별도로 선언해서 사용해주면 그만입니다.
- class-validator도 동작하며, 쿼리 리턴 데이터에 error필드에 메세지가 담겨집니다.(이것또한 정말 편리!)

#### service 단은 기존 Rest module에서 사용하는 방식 그대로 활용해도됩니다. 어차피 쿼리문에서 지정한 필드만 리턴하기 때문에, 서비스 단을 좀더 간결하게 써도된다는 장점이 있네요.(클라이언트 단에서 고생을 쫌 하겠습니다.)

#### app.module 의 GraphQLModule config에 playground를 true로 지정했다면, 앱 호스팅 주소/graphQL에서 마구 테스트하면됩니다.

## TO-DO List

### 🚀 Features

- [x] 기본 GraphQL 서버 설정
- [x] 게시글 리졸버 생성
- [ ] JWT 인증 구현
- [ ] 쿼리 페이징 구현
- [ ] 구독(Subscription) 쿼리 선언해보기