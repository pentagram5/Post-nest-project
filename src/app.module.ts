import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { PostEntity } from './entities/Post.entity';
import { PostModule } from './modules/post/post.module';
import { KeywordsEntity } from './entities/Keyword.entity';
import { KeywordsModule } from './modules/keywords/keywords.module';
import { CommentModule } from './modules/comment/comment.module';
import { GraphqlModule } from './graphql/graphql.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema,
      load: [],
      cache: true,
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await typeORMConfig(configService),
    }),
    TypeOrmModule.forFeature([PostEntity, KeywordsEntity]),
    PostModule,
    KeywordsModule,
    CommentModule,
    GraphqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
