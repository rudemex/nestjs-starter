import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('test-env')
  async getTestEnv(): Promise<string> {
    return this.appService.getTestEnv();
  }

  @Get('my-util')
  getMyUtil() {
    return this.appService.getMyCustomUtil();
  }
}
