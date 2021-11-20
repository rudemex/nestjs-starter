import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

import { config } from '../../config';

@ApiTags('Health')
@Controller('readiness')
export class ReadinessController {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Get readiness' })
  async check() {
    const servicesPingCheckList = Object.keys(this.appConfig.services).map((key) => {
      const urlService = new URL(this.appConfig.services[key]);
      return () => this.http.pingCheck(`${key}`, `${urlService.origin}`);
    });

    const response = this.health.check([...servicesPingCheckList]);
    return (await response).info;
  }
}
