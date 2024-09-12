import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('[Node.js 엔지니어 과제] - API Docs')
    .setDescription(
      '<strong>API 관련 사항</strong><br>' +
        '<ul>' +
        '  <li>모든 파라미터 및 리턴 데이터 스키마의 명명규칙은 `카멜케이스`로 되어있습니다.</li>' +
        '  <li>생성일자 (createdAt), 수정일자 (updatedAt)과 같은 날짜 데이터는 `UTC ISO 규격`으로 리턴됩니다.</li>' +
        '  <li>신규 게시글, 신규 댓글 작성 시 키워드 알림 함수가 void로 호출되며, 조회된 키워드는 터미널에서 로그로 노출됩니다.</li>' +
        '</ul>',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
