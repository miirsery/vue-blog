import { Injectable } from '@nestjs/common';
import { UserType } from './types';
import { users } from './constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): UserType[] {
    return users;
  }

  createUser(body: any): { status: 'ok' | 'fail'; message: string } {
    users.push(body);

    return {
      status: 'ok',
      message: 'user is created',
    };
  }
}
