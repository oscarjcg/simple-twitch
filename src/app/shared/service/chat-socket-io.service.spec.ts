import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { FakeSocket } from '../../../testing/fake-socket';
import { ChatSocketIoService } from './chat-socket-io.service';

describe('ChatSocketIoService', () => {
  let service: ChatSocketIoService;
  let socket: FakeSocket;

  beforeEach(() => {
    socket = new FakeSocket();
    TestBed.configureTestingModule({
      providers: [{ provide: Socket, useValue: socket }],
    });
    service = TestBed.inject(ChatSocketIoService);
  });

  it('connects and disconnects the socket', () => {
    service.connectChat();
    expect(socket.connect).toHaveBeenCalledTimes(1);

    service.disconnectChat();
    expect(socket.disconnect).toHaveBeenCalledTimes(1);
  });

  it('forwards "newMessage" events', () => {
    const messages: unknown[] = [];
    service.chatMessagesChanged.subscribe(m => messages.push(m));

    socket.emit('newMessage', { id: 1 });

    expect(messages).toEqual([{ id: 1 }]);
  });

  it('forwards "totalConnections" events', () => {
    const totals: number[] = [];
    service.chatPeopleChanged.subscribe(t => totals.push(t));

    socket.emit('totalConnections', 5);

    expect(totals).toEqual([5]);
  });
});
