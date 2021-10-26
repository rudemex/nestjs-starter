import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('liveness')
export class LivenessController {
  @Get()
  @ApiOperation({ summary: 'Get liveness' })
  getLiveness() {
    return { status: 'up' };
  }
}
