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

  @Field({ description: '게시글 내용 - full text index' }) // 게시글 내용 필드
  @Index('CONTENT_FULLTEXT_INDEX', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'text', comment: '게시글 내용' })
  content: string; // 게시글 내용

  @Field({ description: '작성자 이름 - full text index' }) // 작성자 이름 필드
  @Index('AUTHOR_FULLTEXT_INDEX', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'varchar', length: 100, comment: '작성자 이름' })
  author: string; // 작성자 이름

  @Column({ type: 'varchar', length: 255, comment: '비밀번호 - hash' })
  password: string; // 비밀번호 - 해싱처리

  @Field(() => Date) // 생성일자 필드
  @CreateDateColumn({ name: 'created_at', precision: 6, comment: '생성일자' })
  createdAt: Date;

  @Field(() => Date) // 수정일자 필드
  @UpdateDateColumn({ name: 'updated_at', precision: 6, comment: '수정일자' })
  updatedAt: Date;
}
