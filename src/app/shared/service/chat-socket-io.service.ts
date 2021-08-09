import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class ChatSocketIoService {
  chatMessagesChanged = this.socket.fromEvent('newMessage');
  chatPeopleChanged = this.socket.fromEvent<number>('totalConnections');

  constructor(private socket: Socket) { }

  connectChat() {
    this.socket.connect();
  }

  disconnectChat() {
    this.socket.disconnect()
  }

}
