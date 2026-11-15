import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { DataComponentService } from '../../shared/service/data-component.service';
import { FakeSocket } from '../../../testing/fake-socket';
import { makeChannels, makeComments } from '../../../testing/fixtures';
import {
  createChannelServiceStub,
  createChatServiceStub,
  provideChannelStub,
  provideChatStub,
} from '../../../testing/service-stubs';
import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let chatService: ReturnType<typeof createChatServiceStub>;
  let channelService: ReturnType<typeof createChannelServiceStub>;
  let socket: FakeSocket;

  beforeEach(() => {
    chatService = createChatServiceStub();
    channelService = createChannelServiceStub();
    socket = new FakeSocket();
    TestBed.configureTestingModule({
      imports: [ChatComponent],
      providers: [
        provideChatStub(chatService),
        provideChannelStub(channelService),
        { provide: Socket, useValue: socket },
      ],
    });
  });

  function create() {
    const fixture = TestBed.createComponent(ChatComponent);
    fixture.componentRef.setInput('channel', makeChannels()[0]);
    fixture.detectChanges();
    return fixture;
  }

  it('fetches the comments of the channel and renders them', () => {
    const fixture = create();
    expect(chatService.fetchComments).toHaveBeenCalledWith('gamer');

    chatService.commentsChanged.next(makeComments());
    fixture.detectChanges();

    const comments = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.commentContainer'))
      .map(c => Array.from(c.querySelectorAll('p')).map(p => p.textContent.trim()));
    expect(comments).toEqual([['alice:', 'Hello!'], ['bob:', 'Nice stream']]);
  });

  it('fetches the comments again when the socket reports a new message', () => {
    create();
    chatService.fetchComments.mockClear();

    socket.emit('newMessage');

    expect(chatService.fetchComments).toHaveBeenCalledWith('gamer');
  });

  it('sends the typed message on Enter and clears the input', () => {
    const fixture = create();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'Hey there';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

    expect(chatService.addComment).toHaveBeenCalledWith('gamer', 1, 'Angular App', 'Hey there');
    expect(input.value).toBe('');
  });

  it('shows the current video time', () => {
    const fixture = create();
    expect(fixture.nativeElement.textContent).toContain('Time: 0.00');

    channelService.currentTimeChanged.next(3.14159);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Time: 3.14');
  });

  it('marks the scroll as manual only after the user scrolls a second time', () => {
    const fixture = create();
    const container = fixture.nativeElement.querySelector('.contentContainer');

    container.dispatchEvent(new Event('scroll'));
    expect(fixture.componentInstance.manualScroll).toBe(false);

    container.dispatchEvent(new Event('scroll'));
    expect(fixture.componentInstance.manualScroll).toBe(true);
  });

  it('resizes to the space below the header', () => {
    const fixture = create();
    TestBed.inject(DataComponentService).heightHeader = 40;

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mainContainer').style.height).toBe(`${window.innerHeight - 40}px`);
  });
});
