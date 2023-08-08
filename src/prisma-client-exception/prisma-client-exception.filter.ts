import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

// ensure that this filter catches exception of type Prisma.PrismaClientKnownRequestError
@Catch(Prisma.PrismaClientKnownRequestError)
// extends the BaseExceptionFilter class which provides a default implementation for the catch method
// which returns an "Internal server error" response to the user
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // log the error message to the console which is useful for debugging purposes
    console.error(exception.message);

    // access the underlying framework Response object and directly modify the response
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      // handle exception code P2002
      case 'P2002':
        {
          const status = HttpStatus.CONFLICT;
          response.status(status).json({
            statusCode: status,
            message: message,
          });
        }
        break;
      // handle exception code P2025
      case 'P2025':
        {
          const status = HttpStatus.NOT_FOUND;
          response.status(status).json({
            statusCode: status,
            message: message,
          });
        }
        break;
      // handle exception code besides P2002
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
