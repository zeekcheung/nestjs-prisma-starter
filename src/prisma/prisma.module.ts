import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  // exports PrismaService to other modules to let them can use PrismaClient to access database.
  exports: [PrismaService],
})
export class PrismaModule {}
