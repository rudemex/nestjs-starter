import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //@ApiExcludeEndpoint()
  @Get('test-env')
  getTestEnv(): string {
    return this.appService.getTestEnv();
  }

  @Get('my-util')
  getMyUtil() {
    return this.appService.getMyCustomUtil();
  }
}
