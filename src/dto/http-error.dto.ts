import { ApiProperty } from '@nestjs/swagger';

export class HttpError400Dto {
  @ApiProperty({ description: '메시지' })
  message: string[];

  @ApiProperty({ description: '오류내용' })
  error: string;

  @ApiProperty({ description: '오류코드' })
  status: number;
}

export class Http4XXDto {
  @ApiProperty({ description: '메시지' })
  message: string;

  @ApiProperty({ description: '오류내용' })
  error: string;

  @ApiProperty({ description: '오류코드' })
  status: number;
}
