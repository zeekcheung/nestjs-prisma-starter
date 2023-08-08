import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use pipes to perform input validation
  // use whitelist to filter unnecessary fields from client requests
  // whitelist will filter all fields without validation decorators, even if they are defined in th DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // use interceptors to execute extra logic before and after the router handler is executed
  // use ClassSerializerInterceptor to serialize the response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // config swagger
  const swaggerConfig = new DocumentBuilder()
    .setDescription('The Median API description')
    .setVersion('0.1')
    // "authenticate" yourself directly in swagger so that you can test these endpoints
    .addBearerAuth()
    .build();

  // setup swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // apply the exception filter to the entire application
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
