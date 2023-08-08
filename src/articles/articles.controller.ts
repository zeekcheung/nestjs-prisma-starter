import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
// use @ApiTags decorators to group all the articles endpoints together in Swagger.
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  // use @ApiCreatedResponse decorators to define the response type of the created article.
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    const article = await this.articlesService.create(createArticleDto);
    // return ArticleEntity instead of Prisma.Article objects
    return new ArticleEntity(article);
  }

  @Get()
  // use @ApiOkResponse decorators to define the response type of the found articles.
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    const articles = await this.articlesService.findAll();
    // return ArticleEntity instead of Prisma.Article objects
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  // use pipes to perform input transformation
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    // use a built-in exception provided by NestJS to handle exceptions
    if (!article) {
      throw new NotFoundException(`Article with ${id}} does not exist.`);
    }
    // return ArticleEntity instead of Prisma.Article objects
    return new ArticleEntity(article);
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts() {
    const articles = await this.articlesService.findDrafts();
    // return ArticleEntity instead of Prisma.Article objects
    return articles.map((article) => new ArticleEntity(article));
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.articlesService.update(id, updateArticleDto);
    // not found exception thrown by Prisma will be handled by the PrismaClientExceptionFilter
    // which is defined in src/prisma-client-exception/prisma-client-exception.filter.ts
    // and applied to the entire application
    // return ArticleEntity instead of Prisma.Article objects
    return new ArticleEntity(article);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.remove(id);
    return new ArticleEntity(article);
  }
}
