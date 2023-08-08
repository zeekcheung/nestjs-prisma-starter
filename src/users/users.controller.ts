import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // return UserEntity instead of Prisma.User objects
    return new UserEntity(user);
  }

  @Get()
  // use JwtAuthGuard to protect this route
  @UseGuards(JwtAuthGuard)
  // use @ApiBearerAuth() decorator to indicate that authentication is required
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll();
    // return UserEntity instead of Prisma.User objects
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  // use JwtAuthGuard to protect this route
  @UseGuards(JwtAuthGuard)
  // use @ApiBearerAuth() decorator to indicate that authentication is required
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    // return UserEntity instead of Prisma.User objects
    return new UserEntity(user);
  }

  @Patch(':id')
  // use JwtAuthGuard to protect this route
  @UseGuards(JwtAuthGuard)
  // use @ApiBearerAuth() decorator to indicate that authentication is required
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    // return UserEntity instead of Prisma.User objects
    return new UserEntity(user);
  }

  @Delete(':id')
  // use JwtAuthGuard to protect this route
  @UseGuards(JwtAuthGuard)
  // use @ApiBearerAuth() decorator to indicate that authentication is required
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.remove(id);
    // return UserEntity instead of Prisma.User objects
    return new UserEntity(user);
  }
}
