import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKeywordsDto {
  @ApiProperty({
    description: '키워드 작성자',
    example: 'test_keyword_author',
    maxLength: 100,
  })
  @IsNotEmpty({
    message: '게시글 작성자 명은 필수 항목입니다.',
  })
  @IsString({
    message: '게시글 작성자 명은 스트링타입만 가능합니다.',
  })
  @MaxLength(100, {
    message: '게시글 작성자명은 100글자를 넘길 수 없습니다.',
  })
  author: string;

  @ApiProperty({
    description: '키워드',
    example: '키워드',
    maxLength: 100,
  })
  @IsNotEmpty({
    message: '키워드는 필수 항목입니다.',
  })
  @IsString({
    message: '키워드는 스트링타입만 가능합니다.',
  })
  @MaxLength(100, {
    message: '키워드는 100글자를 넘길 수 없습니다.',
  })
  keyword: string;
}

export class CreateKeywordsResponseDto {
  @ApiProperty({ description: '키워드 ID', example: 1 })
  keywordId: number | null;

  @ApiProperty({ description: '메시지', example: '알림키워드 생성 성공' })
  message: string;
}
