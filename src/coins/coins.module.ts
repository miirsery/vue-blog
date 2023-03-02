import { Module } from '@nestjs/common'
import { CoinsWebsocket } from './coins'
import { CoinsController } from './coins.controller'
@Module({
  providers: [CoinsWebsocket],
  controllers: [CoinsController],
})
export class CoinsModule {}
