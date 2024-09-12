import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './Post.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn({ name: 'comment_id', comment: '댓글고유id' })
  commentId: number;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id', foreignKeyConstraintName: 'FK_POST_POST_ID' })
  post: PostEntity;

  @Column({ name: 'post_id' })
  postId: number;

  @Column({ type: 'varchar', length: 255, comment: '작성자 이름' })
  author: string;

  @Index('CONTENT_FULLTEXT_INDEX', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'text', comment: '댓글 내용' })
  content: string;

  @ManyToOne(() => CommentEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'parent_comment_id',
    foreignKeyConstraintName: 'FK_COMMENT_COMMENT_ID',
  })
  parentComment: CommentEntity;

  @Column({ name: 'parent_comment_id', nullable: true })
  parentCommentId: number | null;

  @CreateDateColumn({ name: 'created_at', precision: 6, comment: '작성 일자' })
  createdAt: Date;
}
