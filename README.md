<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

# Nest TypeScript 게시판 프로젝트

## 설명

이 프로젝트는 [Nest](https://github.com/nestjs/nest) 프레임워크를 사용한
`댓글 기능이 있는 익명 게시판 및 키워드 알림 기능 구현` 백엔드 API입니다.

## 데이터베이스 정보

- **데이터베이스**: MySQL 8.0.39
- **데이터베이스 생성**: DataBase는 Charset : utf8mb4 로 생성합니다. 생성시 사용한 DB명칭은 .env파일에 동일하게 기입해주셔야합니다.
- **스키마**: 데이터베이스 스키마 생성 스크립트는 `DDL.txt` 파일에 작성되어 있습니다.

## 설치

```bash
$ yarn install
```

## 애플리케이션 실행

애플리케이션을 다양한 모드로 실행할 수 있습니다:

```bash
# 개발 모드
$ yarn run start

# 감시 모드 (파일 변경 시 자동 재시작)
$ yarn run start:dev

# 프로덕션 모드
$ yarn run start:prod
```

## Swagger 문서

애플리케이션이 실행된 후, Swagger API 문서는 `/api-docs` 경로에서 접근할 수 있습니다.

## 환경 변수

루트 디렉토리에 `.env` 파일을 생성하고 다음과 같은 환경 변수를 설정해주세요:

```env
# 데이터베이스 호스트명 (예: localhost)
DB_HOSTNAME=

# 데이터베이스 포트 (예: 3306)
DB_PORT=

# 데이터베이스 이름
DB_DATABASE=

# 데이터베이스 사용자명
DB_USERNAME=

# 데이터베이스 비밀번호
DB_PASSWORD=

# 데이터베이스 동기화 여부 (true/false)
DB_SYNCHRONIZE=true

# 애플리케이션 포트 
PORT=
```

각 변수는 다음과 같은 역할을 합니다:

- `DB_HOSTNAME`: 데이터베이스 서버의 호스트명을 설정합니다.
- `DB_PORT`: 데이터베이스 서버의 포트를 설정합니다.
- `DB_DATABASE`: 사용할 데이터베이스의 이름을 설정합니다.
- `DB_USERNAME`: 데이터베이스에 접근할 사용자명을 설정합니다.
- `DB_PASSWORD`: 데이터베이스 사용자 비밀번호를 설정합니다.
- `DB_SYNCHRONIZE`: 애플리케이션 시작 시 선언한 엔티티를 데이터베이스 스키마로 자동으로 동기화할지 여부를 설정합니다.
- `PORT`: 애플리케이션이 실행될 포트를 설정합니다.

---

## 디렉토리 구조

프로젝트의 기본 디렉토리 구조는 다음과 같습니다:

```
src/
│
├── app.module.ts          # 루트 모듈
├── main.ts                # 애플리케이션 진입점
│
├── config/                # 환경설정
│   ├── typeorm.config.ts  # typeORM configure
│   └── swagger.ts         # 스웨거 설정
│
├── dto/                   # 전역사용 DTO 
│   └── http-error.dto.ts  # http error DTO
│
├── entities/               # 엔티티 정의
│   ├── Comments.entity.ts  # 댓글 테이블 엔티티 정의
│   ├── Keyword.entity.ts/  # 키워드 테이블 엔티티 정의
│   └── Post.entity.ts/     # 게시판 게시글 테이블 엔티티 정의
│
├── modules/                # 기능 모듈 디렉토리
│   ├── comment/            # 댓글 모듈
│   │   ├── comment.controller.ts
│   │   ├── comment.service.ts
│   │   ├── comment.module.ts
│   │   └── dto/            # 데이터 전송 객체 (DTO)
│   │
│   ├── keywords/           # 키워드 모듈
│   │   ├── comment.controller.ts
│   │   ├── comment.service.ts
│   │   ├── comment.module.ts
│   │   └── dto/            # 데이터 전송 객체 (DTO)
│   │
│   └── post/               # 게시글 모듈
│       ├── comment.controller.ts
│       ├── comment.service.ts
│       ├── comment.module.ts
│       └── dto/            # 데이터 전송 객체 (DTO)
│
└── util/                  # 유틸리티
    └── bcryptUtil.ts       # 암호화 유틸

```
