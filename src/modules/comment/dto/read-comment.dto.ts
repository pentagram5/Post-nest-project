import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { PostEntity } from '../../../entities/Post.entity';

export class CommentSearchDataDto extends PostEntity {
  @ApiProperty({
    description: '댓글 id',
    example: 1,
  })
  @Expose()
  commentId: number;

  @ApiProperty({
    description: '댓글 작성자명',
    example: '댓글 작성자',
  })
  @Expose()
  author: string;

  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 내용',
  })
  @Expose()
  content: string;

  @ApiProperty({
    description: '댓글 작성 시간 - UTC iso',
    example: '2024-09-11T01:37:40.000Z',
  })
  @Expose()
  createdAt: Date;
}

export class CommentSearchResponseDto {
  @ApiProperty({ description: '현재 페이지' })
  @IsNumber()
  page: number;

  @ApiProperty({ description: '검색 조건 내 전체 건수' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: '페이지별 건수' })
  @IsNumber()
  limit: number;

  @ApiProperty({ description: '최대지 페이지' })
  @IsNumber()
  maxPage: number;

  @ApiProperty({ type: [CommentSearchDataDto], description: 'List of results' })
  @IsArray()
  results: CommentSearchDataDto[];
}

export class CommentSearchDto {
  @ApiProperty({
    description: '게시글 id',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  postId: number;

  @ApiProperty({
    description:
      '부모 댓글 ID - 댓글의 대한 댓글을 조회 할 경우, 부모 댓글 ID 기입',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  parentCommentId: number;

  @ApiProperty({ description: '페이지', required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => value ?? 1)
  @Type(() => Number)
  @IsInt({ message: '페이지는 정수형만 입력가능합니다.' })
  @Min(1, { message: '페이지는 최소 1 이상 기입되어야합니다.' })
  page?: number = 1;

  @ApiProperty({ description: '페이지별 건수', required: false, default: 10 })
  @IsOptional()
  @Transform(({ value }) => value ?? 10)
  @Type(() => Number)
  @IsInt({ message: '페이지별 건수는 정수형만 입력가능합니다.' })
  @Min(1, { message: '페이지별 건수는 최소 1 이상 기입되어야합니다.' })
  limit?: number = 10;
}
