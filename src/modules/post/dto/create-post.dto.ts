import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: '게시글 작성자',
    example: 'test_author',
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
    description: '게시글 제목',
    example: 'test_author',
    maxLength: 255,
  })
  @IsNotEmpty({
    message: '게시글 제목은 필수 항목입니다.',
  })
  @IsString({
    message: '게시글 제목은 스트링타입만 가능합니다.',
  })
  @MaxLength(255, {
    message: '게시글 제목은 255글자를 넘길 수 없습니다.',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: 'test_contents',
  })
  @IsNotEmpty({
    message: '게시글 내용은 반드시 포함되어야 합니다.',
  })
  @IsString({
    message: '게시글 내용은 스트링타입만 가능합니다.',
  })
  content: string;

  @ApiProperty({
    description:
      "비밀번호 - '패스워드는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수 문자를 각각 1개 이상 포함해야 합니다.' - 해싱처리 ",
    example: 'Qwer1234!@',
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: '패스워드는 최소 8자 이상이어야 합니다.' })
  @Matches(/(?=.*[A-Z])/, {
    message: '패스워드는 최소 1개의 대문자를 포함해야 합니다.',
  })
  @Matches(/(?=.*[a-z])/, {
    message: '패스워드는 최소 1개의 소문자를 포함해야 합니다.',
  })
  @Matches(/(?=.*[0-9])/, {
    message: '패스워드는 최소 1개의 숫자를 포함해야 합니다.',
  })
  @Matches(/(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?~\\/-])/, {
    message: '패스워드는 최소 1개의 특수 문자를 포함해야 합니다.',
  })
  password: string;
}

export class CreatePostResponseDto {
  @ApiProperty({ description: '게시글 ID', example: 1 })
  postId: number | null;

  @ApiProperty({ description: '메시지', example: '게시글 생성 성공' })
  message: string;
}
