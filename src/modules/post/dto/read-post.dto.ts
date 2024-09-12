import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from '../../../entities/Post.entity';

export class PostSearchDataDto extends PostEntity {
  @ApiProperty({ description: '게시글 id' })
  @Expose()
  postId: number;

  @ApiProperty({ description: '게시글 타이틀' })
  @Expose()
  title: string;

  @ApiProperty({ description: '게시글 작성자' })
  @Expose()
  author: string;

  @ApiProperty({
    description: '게시글 작성 시간 - UTC iso',
    example: '2024-09-11T01:37:40.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: '게시글 수정 시간 - UTC iso',
    example: '2024-09-11T01:37:40.000Z',
  })
  @Expose()
  updatedAt: Date;
}

export class PostSearchDto {
  @ApiProperty({
    description: '작성자 명 검색 키워드 - 최소 두글자 이상',
    required: false,
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: '작성자 명은 최소 두글자 이상 입력해야합니다.' })
  readonly author?: string;

  @ApiProperty({
    description: '게시글 제목 검색 키워드 - 최소 두글자 이상',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: '게시글 제목 검색 키워드는 최소 두글자 이상 입력해야합니다.',
  })
  readonly title?: string;

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

export class PostSearchResponseDto {
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

  @ApiProperty({ type: [PostSearchDataDto], description: 'List of results' })
  @IsArray()
  results: PostSearchDataDto[];
}

export class PostDataResponseDto extends PostEntity {
  @ApiProperty({ description: '게시글 id' })
  @Expose()
  postId: number;

  @ApiProperty({ description: '게시글 타이틀' })
  @Expose()
  title: string;

  @ApiProperty({ description: '게시글 작성자' })
  @Expose()
  author: string;

  @ApiProperty({ description: '게시글 내용' })
  @Expose()
  content: string;

  @ApiProperty({
    description: '게시글 작성 시간 - UTC iso',
    example: '2024-09-11T01:37:40.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: '게시글 수정 시간 - UTC iso',
    example: '2024-09-11T01:37:40.000Z',
  })
  @Expose()
  updatedAt: Date;
}
