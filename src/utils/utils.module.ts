import { Module } from '@nestjs/common';

import { UtilsService } from './services/utils.service.js';

@Module({
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
