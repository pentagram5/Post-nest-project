create table if not exists post
(
    post_id    int auto_increment comment '게시글 고유 id'
        primary key,
    title      varchar(255)                             not null comment '게시글 제목',
    content    text                                     not null comment '게시글 내용',
    author     varchar(100)                             not null comment '작성자 이름',
    password   varchar(255)                             not null comment '비밀번호 - hash',
    created_at datetime(6) default CURRENT_TIMESTAMP(6) not null comment '생성일자',
    updated_at datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6) comment '수정일자'
);

create table if not exists keywords
(
    keyword_id int auto_increment comment '키워드 고유 id'
        primary key,
    author     varchar(100)                             not null comment '작성자 이름',
    keyword    varchar(255)                             not null comment '키워드',
    created_at datetime(6) default CURRENT_TIMESTAMP(6) not null comment '생성일자',
    updated_at datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6) comment '수정일자',
    constraint UNIQUE_AUTHOR
        unique (author)
);

create table if not exists comment
(
    comment_id        int auto_increment comment '댓글고유id'
        primary key,
    author            varchar(255)                             not null comment '작성자 이름',
    content           text                                     not null comment '댓글 내용',
    created_at        datetime(6) default CURRENT_TIMESTAMP(6) not null comment '작성 일자',
    updated_at        datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6) comment '수정 일자',
    post_id           int                                      not null,
    parent_comment_id int                                      null,
    constraint FK_COMMENT_COMMENT_ID
        foreign key (parent_comment_id) references comment (comment_id)
            on delete cascade,
    constraint FK_POST_POST_ID
        foreign key (post_id) references post (post_id)
            on delete cascade
);

create fulltext index AUTHOR_FULLTEXT_INDEX
    on post (author);

create fulltext index CONTENT_FULLTEXT_INDEX
    on post (content);

create fulltext index TITLE_FULLTEXT_INDEX
    on post (title);

