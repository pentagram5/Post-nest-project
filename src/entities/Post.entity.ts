import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn({ name: 'post_id', comment: '게시글 고유 id' })
  postId: number; // 자동 증가 ID

  @Index('TITLE_FULLTEXT_INDEX', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'varchar', length: 255, comment: '게시글 제목' })
  title: string; // 게시글 제목

  @Index('CONTENT_FULLTEXT_INDEX', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'text', comment: '게시글 내용' })
  content: string; // 게시글 내용

  @Index('AUTHOR_FULLTEXT_INDEX', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'varchar', length: 100, comment: '작성자 이름' })
  author: string; // 작성자 이름

  @Column({ type: 'varchar', length: 255, comment: '비밀번호 - hash' })
  password: string; // 비밀번호 - 해싱처리

  @CreateDateColumn({ name: 'created_at', precision: 6, comment: '생성일자' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', precision: 6, comment: '수정일자' })
  updatedAt: Date;
}
