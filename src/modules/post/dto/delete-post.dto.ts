import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePostDto {
  @ApiProperty({
    description: '비밀번호 - 게시글 등록시 기입한 패스워드를 입력해주세요',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
