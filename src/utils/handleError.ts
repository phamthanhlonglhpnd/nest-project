import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleThrowError = (error: any, msg?: string) => {
  if (error?.response?.error == 'Bad Request')
    throw new BadRequestException(error?.message);
  throw new InternalServerErrorException(msg || error?.message);
};
