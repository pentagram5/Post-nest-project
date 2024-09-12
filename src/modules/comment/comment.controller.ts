import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentBodyDto,
  CreateCommentQueryDto,
  CreateCommentResponseDto,
} from './dto/create-comment.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Http4XXDto, HttpError400Dto } from '../../dto/http-error.dto';
import {
  CommentSearchDto,
  CommentSearchResponseDto,
} from './dto/read-comment.dto';

@Controller('comment')
@ApiTags('댓글 API')
@ApiNotFoundResponse({
  description: '해당 리소스 없음',
  type: Http4XXDto,
})
@ApiBadRequestResponse({
  description: '잘못된 요청 인자.',
  type: HttpError400Dto,
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({
    summary: '댓글 작성 API',
    description:
      '<strong>기능 설명:</strong><br>\n' +
      '<dd>게시글 ID (`postId`)에 대한 댓글을 작성합니다. </dd><br>\n' +
      '<strong>입력 항목(Path Param):</strong><br>\n' +
      '<ul>\n' +
      '  <li>게시글 ID (`postId`) - 필수 : 댓글을 작성할 게시글의 고유 ID입니다.</li>\n' +
      '  <li>부모 댓글 ID (`parentCommentId`) - 옵션: 댓글에 대한 댓글을 작성 할경우, 부모댓글 의 고유 ID입니다.</li>\n' +
      '</ul><br>' +
      '<strong>입력 항목(Body):</strong><br>\n' +
      '<ul>\n' +
      '  <li>작성자 (`author`)</li>\n' +
      '  <li>댓글 내용 (`content`)</li>\n' +
      '</ul><br>' +
      '<strong>댓글 내용 기반 키워드 알림 처리:</strong><br>\n' +
      '<ul>\n' +
      '  <li>신규 댓글 등록 시, 댓글 내용 기반의 키워드 알림 함수가 호출됩니다.</li>\n' +
      '  <li>이 함수는 <code>void</code>로 실행되며, 알림 키워드가 존재할 경우 로그로 노출됩니다.</li>\n' +
      '</ul>',
  })
  @ApiCreatedResponse({
    description: '새로운 댓글 생성 성공.',
    type: CreateCommentResponseDto,
  })
  create(
    @Query() createCommentQueryDto: CreateCommentQueryDto,
    @Body() createCommentBodyDto: CreateCommentBodyDto,
  ) {
    return this.commentService.create(
      createCommentQueryDto,
      createCommentBodyDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: '댓글 조회 API',
    description:
      '<strong>기능 설명:</strong><br>\n' +
      '<dd>게시글 ID (`postId`)에 대한 페이징된 댓글 데이터를 리턴합니다., 생성일자 (`createdAt`) 기준으로 최신순으로 정렬됩니다.</dd>\n' +
      '<dd>게시글 ID (`postId`)에 등록된 댓글에 대한 댓글 목록을 조회하기 위해서, 부모 댓글 ID(`parentCommentId`)를 기입합니다. .</dd>\n' +
      '<dd>댓글 데이터는  댓글 ID (`commentId`), 작성자 (`author`), 댓글 내용 (`content`), 댓글 작성 시간 (`createdAt`)을 리턴합니다.</dd><br>\n' +
      '\n' +
      '<strong>입력 항목(Query):</strong><br>\n' +
      '<ul>\n' +
      '  <li>게시글 ID (`postId`)</li>\n' +
      '  <li>부모 댓글 ID(`parentCommentId`)</li>\n' +
      '  <li>페이지 (`page`): 페이지 번호 지정. 기본값은 1입니다.</li>\n' +
      '  <li>페이지별 건수 (`limit`): 페이지당 표시할 게시글 수를 지정. 기본값은 10입니다.</li>\n' +
      '</ul><br>\n' +
      '\n',
  })
  @ApiOkResponse({
    description: '댓글 페이지 아이템 리턴',
    type: CommentSearchResponseDto,
  })
  findAll(@Query() commentSearchDto: CommentSearchDto) {
    return this.commentService.findAll(commentSearchDto);
  }
}
