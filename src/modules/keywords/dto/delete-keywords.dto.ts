import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteKeywordsDto {
  @ApiProperty({
    description: '키워드 등록시 설정한 작성자명',
  })
  @IsNotEmpty()
  @IsString()
  author: string;
}
