import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KeywordsEntity } from '../../entities/Keyword.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { PostEntity } from '../../entities/Post.entity';
import {
  CreateKeywordsDto,
  CreateKeywordsResponseDto,
} from './dto/create-keywords.dto';
import { DeleteKeywordsDto } from './dto/delete-keywords.dto';
import { CommentEntity } from '../../entities/Comments.entity';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(KeywordsEntity)
    private keywordsRepository: Repository<KeywordsEntity>,
  ) {}

  async create(
    createKeywordsDto: CreateKeywordsDto,
  ): Promise<CreateKeywordsResponseDto> {
    const findAuthor = await this.keywordsRepository.findOne({
      where: {
        author: createKeywordsDto.author,
      },
    });
    if (findAuthor) {
      throw new ConflictException('동일한 작성자가 이미 존재합니다.');
    } else {
      const newKeywords = new KeywordsEntity();
      newKeywords.author = createKeywordsDto.author;
      newKeywords.keyword = createKeywordsDto.keyword;
      const item = await this.keywordsRepository.save(newKeywords);
      return { keywordId: item.keywordId, message: '알림 키워드 등록 성공' };
    }
  }

  async remove(keywordId: number, deleteKeywordDto: DeleteKeywordsDto) {
    const keywordItem = await this.keywordsRepository.findOne({
      where: {
        keywordId,
        author: deleteKeywordDto.author,
      },
    });
    if (keywordItem) {
      await this.keywordsRepository.delete({
        keywordId: keywordItem.keywordId,
      });
    } else {
      throw new NotFoundException(`해당 키워드 아이템 없음`);
    }
  }

  private async searchKeywordOwnerByContents(content: string) {
    const query = this.keywordsRepository.createQueryBuilder('keywords');
    query.andWhere(":content LIKE CONCAT('%',keyword, '%')", {
      content: content,
    });
    return await query.getMany();
  }

  async findKeywordOwnerByPost(postItem: PostEntity) {
    const items = await this.searchKeywordOwnerByContents(postItem.content);
    items.map((item) => {
      console.log(
        `-------------------------------------\n` + `*** 키워드 알림 ***\n`,
        `신규 게시글에 다음과 같은 키워드가 포함되어 있습니다\n`,
        `- **키워드 등록자**: [${item.author}]\n`,
        `- **키워드**: [${item.keyword}]\n`,
        `- **게시글 제목**: [${postItem.title}]`,
      );
    });
  }

  async findKeywordOwnerByComment(commentItem: CommentEntity) {
    const items = await this.searchKeywordOwnerByContents(commentItem.content);
    items.map((item) => {
      console.log(
        `-------------------------------------\n` + `*** 키워드 알림 ***\n`,
        `신규 댓글에 다음과 같은 키워드가 포함되어 있습니다\n`,
        `- **키워드 등록자**: [${item.author}]\n`,
        `- **키워드**: [${item.keyword}]\n`,
        `- **댓글 내용**: [${commentItem.content}]`,
      );
    });
  }
}
