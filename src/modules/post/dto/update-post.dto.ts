import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto extends CreatePostDto {
  @ApiProperty({
    description: '비밀번호 - 게시글 등록시 기입한 패스워드를 입력해주세요',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdatePostResponseDto {
  @ApiProperty({ description: '게시글 ID', example: 1 })
  postId: number | null;

  @ApiProperty({ description: '메시지', example: '게시글 업데이트 성공' })
  message: string;
}
