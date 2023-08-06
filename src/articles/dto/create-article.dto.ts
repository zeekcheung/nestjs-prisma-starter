import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  // use @ApiProperty decorators to make the class properties visible to Swagger.
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
