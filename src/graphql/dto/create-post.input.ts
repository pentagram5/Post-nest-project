// graphql/dto/create-post.input.ts
import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
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

  @Field()
  @IsNotEmpty({
    message: '게시글 내용은 반드시 포함되어야 합니다.',
  })
  @IsString({
    message: '게시글 내용은 스트링타입만 가능합니다.',
  })
  content: string;

  @Field()
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

  @Field()
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
  password: string; // 해싱은 서비스 레이어에서 처리
}
