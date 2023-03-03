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
    function randomNumber(min: number, max: number) {
      const r = Math.random() * (max - min) + min
      return Math.floor(r)
    }

    return interval(1000).pipe(map((_) => ({ data: { value: randomNumber(0, 10) } } as MessageEvent)))
  }
}
