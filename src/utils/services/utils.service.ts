import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  myCustomUtil() {
    return 'this is an util';
  }
}
