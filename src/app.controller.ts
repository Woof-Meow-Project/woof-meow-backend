import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseHttpException } from './exceptions/http-exceptions/base.http-exception';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  getWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }

  @Get('health')
  getHealthStatus(): string {
    return this.appService.getHealthStatus()
  }

  @Get('api/version')
  getVersion(): string {
    return this.appService.getVersion();
  }

  @Get('exception')
  triggerException() {
    BaseHttpException.throw({
      message: 'An error occurred',
      status: 500,
      info: {
        test: 'test'
      }
    });
  }
}
