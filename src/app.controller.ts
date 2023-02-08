import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserType } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers(): UserType[] {
    return this.appService.getUsers();
  }

  @Post('/users')
  async createUser(@Body() body: any) {
    return this.appService.createUser(body);
  }
}
