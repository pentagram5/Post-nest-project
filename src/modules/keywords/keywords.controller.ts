import {
  Controller,
  Delete,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Http4XXDto, HttpError400Dto } from '../../dto/http-error.dto';
import { KeywordsService } from './keywords.service';
import {
  CreateKeywordsDto,
  CreateKeywordsResponseDto,
} from './dto/create-keywords.dto';
import { DeleteKeywordsDto } from './dto/delete-keywords.dto';

@Controller('keywords')
@ApiTags('키워드 API')
@ApiNotFoundResponse({
  description: '해당 리소스 없음',
  type: Http4XXDto,
})
@ApiBadRequestResponse({
  description: '잘못된 요청 인자.',
  type: HttpError400Dto,
})
@ApiConflictResponse({
  description: 'Conflict Error',
  type: Http4XXDto,
})
export class KeywordsController {
  constructor(@Inject() private readonly keywordsService: KeywordsService) {}

  @Post()
  @ApiOperation({
    summary: '알림 키워드 등록 API',
    description:
      '<strong>기능 설명:</strong>\n' +
      '<dd>신규 알림 키워드를 등록합니다. </dd><br>\n' +
      '<strong>입력 항목(Query):</strong><br>\n' +
      '<ul>\n' +
      '  <li>키워드 작성자 (`author`) : 유니크한 필드로, 중복 등록이 불가합니다.</li>\n' +
      '  <li>키워드 (`keyword`)</li>\n' +
      '</ul><br>\n',
  })
  @ApiCreatedResponse({
    description: '새로운 알림 키워드 등록 성공.',
    type: CreateKeywordsResponseDto,
  })
  create(@Query() createKeywordsDto: CreateKeywordsDto) {
    return this.keywordsService.create(createKeywordsDto);
  }

  @Delete(':keywordId')
  @ApiOperation({
    summary: '알림 키워드 삭제 API',
    description:
      '<strong>기능 설명:</strong>\n' +
      '<dd>지정된 키워드 ID (`keywordId`)를 기반으로, 키워드Id와 작성자명으로 검색 후 존재하는 경우 삭제합니다.. </dd><br>\n' +
      '<strong>입력 항목(Path Param):</strong><br>\n' +
      '<ul>\n' +
      '  <li>키워드 ID (`keywordId`) : 삭제할 키워드 고유 ID입니다.</li>\n' +
      '</ul><br>\n' +
      '<strong>입력 항목(Query):</strong><br>\n' +
      '<ul>\n' +
      '  <li>키워드 작성자 (`author`) : 알림 키워드 등록시 기입한 작성자명입니다. </li>\n' +
      '</ul><br>\n',
  })
  @ApiNoContentResponse({
    description: '키워드 삭제 완료',
  })
  @HttpCode(204)
  async remove(
    @Param('keywordId') keywordId: number,
    @Query() deleteKeywordDto: DeleteKeywordsDto,
  ) {
    await this.keywordsService.remove(keywordId, deleteKeywordDto);
  }
}
