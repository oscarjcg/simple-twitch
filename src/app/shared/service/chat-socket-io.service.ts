import { Injectable, inject } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class ChatSocketIoService {
  private socket = inject(Socket);

  chatMessagesChanged = this.socket.fromEvent('newMessage');
  chatPeopleChanged = this.socket.fromEvent<number>('totalConnections');

  connectChat() {
    this.socket.connect();
  }

  disconnectChat() {
    this.socket.disconnect()
  }

}
