import { Controller, Get, Res, Sse } from '@nestjs/common'
import { interval, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Response } from 'express'

@Controller()
export class CoinsController {
  @Get()
  index(@Res() response: Response) {
    return {
      message: 'Its okay',
    }
  }
  @Sse('coins')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } } as MessageEvent)))
  }
}
