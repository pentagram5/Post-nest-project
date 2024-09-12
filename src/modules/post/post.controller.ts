import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, CreatePostResponseDto } from './dto/create-post.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  PostDataResponseDto,
  PostSearchDto,
  PostSearchResponseDto,
} from './dto/read-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Http4XXDto, HttpError400Dto } from '../../dto/http-error.dto';
import { DeletePostDto } from './dto/delete-post.dto';

@Controller('post')
@ApiTags('게시판 API')
@ApiNotFoundResponse({
  description: '해당 리소스 없음',
  type: Http4XXDto,
})
@ApiBadRequestResponse({
  description: '잘못된 요청 인자.',
  type: HttpError400Dto,
})
export class PostController {
  constructor(@Inject() private readonly postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: '게시글 작성 API',
    description:
      '<strong>기능 설명:</strong>\n' +
      '<dd>신규 게시글을 등록합니다. </dd><br>\n' +
      '<strong>입력 항목(Body):</strong><br>\n' +
      '<ul>\n' +
      '  <li>작성자 (`author`)</li>\n' +
      '  <li>제목 (`title`)</li>\n' +
      '  <li>콘텐츠 (`content`)</li>\n' +
      '  <li>패스워드 (`password`)</li>\n' +
      '</ul><br>\n' +
      '<strong>패스워드 요건:</strong><br>\n' +
      '<ul>\n' +
      '  <li>최소 8자 이상</li>\n' +
      '  <li>대문자, 소문자, 숫자, 특수 문자 각각 1개 이상 포함</li>\n' +
      '</ul><br>\n' +
      '<strong>콘텐츠 내용 기반 키워드 알림 처리:</strong><br>\n' +
      '<ul>\n' +
      '  <li>게시글 등록 시, 콘텐츠 내용 기반의 키워드 알림 함수가 호출됩니다.</li>\n' +
      '  <li>이 함수는 <code>void</code>로 실행되며, 알림 키워드가 존재할 경우 로그로 노출됩니다.</li>\n' +
      '</ul>',
  })
  @ApiCreatedResponse({
    description: '새로운 게시글 생성 성공.',
    type: CreatePostResponseDto,
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary: '게시글 조회 API',
    description:
      '<strong>기능 설명:</strong><br>\n' +
      '<dd>검색 키워드 기반으로 페이징된 게시글 데이터를 리턴합니다., 생성일자 (`createdAt`) 기준으로 최신순으로 정렬됩니다.</dd>\n' +
      '<dd>게시글데이터는 콘텐츠를 제외한 게시글Id(`postId`), 작성자 (`author`), 제목 (`title`), 게시글 작성 시간 (`createdAt`),게시글 수정 시간 (`updatedAt`) 을 리턴합니다.</dd><br>\n' +
      '\n' +
      '<strong>입력 항목(Query):</strong><br>\n' +
      '<ul>\n' +
      '  <li>작성자 명 검색 키워드 (`author`)</li>\n' +
      '  <li>게시글 제목 검색 키워드 (`title`)</li>\n' +
      '  <li>페이지 (`page`): 페이지 번호 지정. 기본값은 1입니다.</li>\n' +
      '  <li>페이지별 건수 (`limit`): 페이지당 표시할 게시글 수를 지정. 기본값은 10입니다.</li>\n' +
      '</ul><br>\n' +
      '\n' +
      '<strong>키워드 검색 조건:</strong><br>\n' +
      '<ul>\n' +
      '  <li><em>Full-text search</em>를 통해 `author`와 `title`이 검색됩니다. </li>\n' +
      '</ul>',
  })
  @ApiOkResponse({
    description: '검색어 기반 페이지 아이템 리턴',
    type: PostSearchResponseDto,
  })
  findAll(@Query() postSearchDto: PostSearchDto) {
    return this.postService.findAll(postSearchDto);
  }

  @Get(':postId')
  @ApiOperation({
    summary: '게시글 상세조회  API',
    description:
      '<strong>postId 기반 게시글 상세내용 리턴</strong><br><br>\n' +
      '\n' +
      '<strong>기능 설명:</strong><br>\n' +
      '<dd>지정된 게시글 ID (`postId`)를 기반으로 게시글의 상세 내용을 반환합니다.</dd>\n' +
      '<dd>리턴되는 데이터는 게시글 ID (`postId`), 작성자 (`author`), 제목 (`title`),콘텐츠 (`content`), 게시글 작성 시간 (`createdAt`), 게시글 수정 시간 (`updatedAt`)입니다.</dd><br>\n' +
      '\n' +
      '<strong>입력 항목(Path Param):</strong><br>\n' +
      '<ul>\n' +
      '  <li>게시글 ID (`postId`): 상세 정보를 조회할 게시글의 고유 ID입니다.</li>\n' +
      '</ul><br>',
  })
  @ApiOkResponse({
    description: '게시글 내용 리턴',
    type: PostDataResponseDto,
  })
  findOne(@Param('postId') postId: number) {
    return this.postService.findOne(postId);
  }

  @Put(':postId')
  @ApiOperation({
    summary: '게시글 업데이트 API',
    description:
      '<strong>기능 설명:</strong><br>\n' +
      '<dd>지정된 게시글 ID (`postId`)를 기반으로 게시글의 내용을 업데이트합니다. 이 작업을 수행하기 위해 게시글 작성 시 등록한 <strong>패스워드 (`password`)</strong>가 필요합니다.</dd><br>\n' +
      '<strong>입력 항목(Path Param):</strong><br>\n' +
      '<ul>\n' +
      '  <li>게시글 ID (`postId`) - path param: 상세 정보를 조회할 게시글의 고유 ID입니다.</li>\n' +
      '</ul><br>' +
      '<strong>입력 항목(Body):</strong><br>\n' +
      '<ul>\n' +
      '  <li>작성자 (`author`)</li>\n' +
      '  <li>제목 (`title`)</li>\n' +
      '  <li>콘텐츠 (`content`)</li>\n' +
      '  <li>패스워드 (`password`) : 기입한 패스워드를 조회되는 게시글 ID의 패스워드와 비교(bcrypt compare)</li>\n' +
      '</ul><br>',
  })
  @ApiOkResponse({
    description: '게시글 업데이트 성공',
    type: PostDataResponseDto,
  })
  @ApiForbiddenResponse({
    description: '게시글 비밀번호 오류',
    type: Http4XXDto,
  })
  update(
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(postId, updatePostDto);
  }

  @Delete(':postId')
  @ApiOperation({
    summary: '게시글 삭제 API',
    description:
      '<strong>기능 설명:</strong><br>\n' +
      '<dd>지정된 게시글 ID (`postId`)를 기반으로 게시글을 삭제합니다. 이 작업을 수행하기 위해 게시글 작성 시 등록한 <strong>패스워드 (`password`)</strong>가 필요합니다.</dd><br>\n' +
      '<strong>입력 항목(Path Param):</strong><br>\n' +
      '<ul>\n' +
      '  <li>게시글 ID (`postId`) - path param: 삭제할 게시글의 고유 ID입니다.</li>\n' +
      '</ul><br>' +
      '<strong>입력 항목(Body):</strong><br>\n' +
      '<ul>\n' +
      '  <li>패스워드 (`password`) : 기입한 패스워드를 조회되는 게시글 ID의 패스워드와 비교(bcrypt compare)</li>\n' +
      '</ul><br>',
  })
  @ApiNoContentResponse({
    description: '게시글 삭제 완료',
  })
  @ApiForbiddenResponse({
    description: '게시글 비밀번호 오류',
    type: Http4XXDto,
  })
  @HttpCode(204)
  async remove(
    @Param('postId') postId: number,
    @Body() deletePostDto: DeletePostDto,
  ) {
    await this.postService.remove(postId, deletePostDto);
  }
}
