import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentQueryDto {
  @ApiProperty({
    description: '게시글 id',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  postId: number;

  @ApiProperty({
    description: '부모 댓글 ID - 댓글의 대한 댓글일 경우, 부모 댓글 ID 기입',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  parentCommentId: number;
}

export class CreateCommentBodyDto {
  @ApiProperty({
    description: '댓글 작성자',
    example: 'test_author',
    maxLength: 100,
  })
  @IsNotEmpty({
    message: '댓글 작성자 명은 필수 항목입니다.',
  })
  @IsString({
    message: '댓글 작성자 명은 스트링타입만 가능합니다.',
  })
  @MaxLength(100, {
    message: '댓글 작성자명은 100글자를 넘길 수 없습니다.',
  })
  author: string;

  @ApiProperty({
    description: '댓글 내용',
    example: 'test_contents',
  })
  @IsNotEmpty({
    message: '댓글 내용은 반드시 포함되어야 합니다.',
  })
  @IsString({
    message: '댓글 내용은 스트링타입만 가능합니다.',
  })
  content: string;
}

export class CreateCommentResponseDto {
  @ApiProperty({ description: '댓글 ID', example: 1 })
  commentId: number | null;

  @ApiProperty({ description: '메시지', example: '댓글 생성 성공' })
  message: string;
}
