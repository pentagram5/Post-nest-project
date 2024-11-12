import { Module } from '@nestjs/common';
import { GraphqlResolver } from './graphql.resolver';
import { GraphqlService } from './graphql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/Post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [GraphqlResolver, GraphqlService],
})
export class GraphqlNestModule {}
