import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { OnModuleInit } from '@nestjs/common'

@WebSocketGateway({ cors: '*:*' })
export class CoinsWebsocket implements OnModuleInit {
  @WebSocketServer()
  server: Server

  onModuleInit(): any {
    if (this.server) {
      this.server.on('connection', (socket) => {
        console.log('Connected')
        console.log(socket.id)
      })
    }
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('onMessage', {
      message: 'new message',
      content: body,
    })
  }
}
