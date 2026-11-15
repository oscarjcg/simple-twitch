import { Component, input, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { Channel } from '../shared/model/channel.model';
import { FakeSocket } from '../../testing/fake-socket';
import { makeChannels } from '../../testing/fixtures';
import { createChannelServiceStub, provideChannelStub } from '../../testing/service-stubs';
import { ChannelComponent } from './channel.component';
import { ChatComponent } from './chat/chat.component';

@Component({ selector: 'youtube-player', template: '' })
class YouTubePlayerStub {
  readonly videoId = input<string>();
  readonly disablePlaceholder = input<boolean>();
  readonly width = input<number>();
  readonly height = input<number>();
  readonly ready = output<unknown>();
  readonly stateChange = output<unknown>();
}

@Component({ selector: 'app-chat', template: '' })
class ChatStub {
  readonly channel = input<Channel>();
}

describe('ChannelComponent', () => {
  let channelService: ReturnType<typeof createChannelServiceStub>;
  let socket: FakeSocket;
  let fixture: ComponentFixture<ChannelComponent>;

  beforeEach(() => {
    channelService = createChannelServiceStub(makeChannels());
    socket = new FakeSocket();
    TestBed.configureTestingModule({
      imports: [ChannelComponent],
      providers: [provideRouter([]), provideChannelStub(channelService), { provide: Socket, useValue: socket }],
    });
    TestBed.overrideComponent(ChannelComponent, {
      remove: { imports: [YouTubePlayer, ChatComponent] },
      add: { imports: [YouTubePlayerStub, ChatStub] },
    });
  });

  afterEach(() => vi.useRealTimers());

  function open(name: string) {
    fixture = TestBed.createComponent(ChannelComponent);
    fixture.componentRef.setInput('channel', name);
    fixture.detectChanges();
    channelService.channelChanged.next(makeChannels());
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('fetches the channels, connects the chat socket and shows the channel header', () => {
    const el = open('modeler');

    expect(channelService.fetchChannels).toHaveBeenCalled();
    expect(socket.connect).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.channel.name).toBe('modeler');
    expect(el.querySelector('app-header-channel .channel-name').textContent).toBe('modeler');
  });

  it('shows the 3D model in an iframe', () => {
    const el = open('modeler');

    const iframe = el.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.src).toBe(environment.models3dUrl + 'robot');
    expect(el.querySelector('youtube-player')).toBeNull();
  });

  it('shows the YouTube player for a video channel', () => {
    const el = open('gamer');

    const player = fixture.debugElement.query(By.directive(YouTubePlayerStub));
    expect(player).not.toBeNull();
    expect((player.componentInstance as YouTubePlayerStub).videoId()).toBe('dQw4w9WgXcQ');
    expect(el.querySelector('iframe')).toBeNull();
  });

  it('passes the channel to the chat on large screens', () => {
    open('gamer');

    const chat = fixture.debugElement.query(By.directive(ChatStub));
    expect((chat.componentInstance as ChatStub).channel().name).toBe('gamer');
  });

  it('shows nothing for an unknown channel', () => {
    const el = open('nobody');

    expect(fixture.componentInstance.channel).toBeUndefined();
    expect(el.querySelector('iframe')).toBeNull();
    expect(el.querySelector('youtube-player')).toBeNull();
    expect(el.querySelector('app-chat')).toBeNull();
  });

  it('reloads when the channel in the URL changes', () => {
    open('gamer');
    channelService.fetchChannels.mockClear();

    fixture.componentRef.setInput('channel', 'modeler');
    fixture.detectChanges();

    expect(channelService.fetchChannels).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.channel).toBeNull();

    channelService.channelChanged.next(makeChannels());
    fixture.detectChanges();
    expect(fixture.componentInstance.channel.name).toBe('modeler');
  });

  it('shows how many people are connected', () => {
    const el = open('gamer');

    socket.emit('totalConnections', 4);
    fixture.detectChanges();

    expect(el.querySelector('.info').textContent).toContain('People: 4');
  });

  it('publishes the player time every 100ms and stops when destroyed', () => {
    vi.useFakeTimers();
    open('gamer');
    const player = { setSize: vi.fn(), getCurrentTime: vi.fn(() => 12) };
    const times: number[] = [];
    channelService.currentTimeChanged.subscribe(t => times.push(t));

    fixture.componentInstance.savePlayer(player);
    expect(player.setSize).toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(times).toEqual([12]);

    fixture.destroy();
    expect(socket.disconnect).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(times).toEqual([12]);
  });
});
