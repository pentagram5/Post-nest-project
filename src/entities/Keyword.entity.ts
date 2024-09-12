import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('keywords')
export class KeywordsEntity {
  @PrimaryGeneratedColumn({ name: 'keyword_id', comment: '키워드 고유 id' })
  keywordId: number; // 자동 증가 ID

  @Index('UNIQUE_AUTHOR', { unique: true })
  @Column({
    type: 'varchar',
    length: 100,
    comment: '작성자 이름',
  })
  author: string; // 작성자 이름

  @Column({ type: 'varchar', length: 255, comment: '키워드' })
  keyword: string;

  @CreateDateColumn({ name: 'created_at', precision: 6, comment: '생성일자' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', precision: 6, comment: '수정일자' })
  updatedAt: Date;
}
