import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { makeChannels } from '../../../testing/fixtures';
import { createChannelServiceStub, provideChannelStub } from '../../../testing/service-stubs';
import { ChannelListComponent } from './channel-list.component';

describe('ChannelListComponent', () => {
  let channelService: ReturnType<typeof createChannelServiceStub>;

  beforeEach(() => {
    channelService = createChannelServiceStub();
    TestBed.configureTestingModule({
      imports: [ChannelListComponent],
      providers: [provideRouter([]), provideChannelStub(channelService)],
    });
  });

  it('shows a spinner until the channels arrive, then renders them', () => {
    const fixture = TestBed.createComponent(ChannelListComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(channelService.fetchChannels).toHaveBeenCalledTimes(1);
    expect(el.querySelector('app-spinner')).not.toBeNull();

    channelService.channelChanged.next(makeChannels());
    fixture.detectChanges();

    expect(el.querySelector('app-spinner')).toBeNull();
    expect(Array.from(el.querySelectorAll('app-channel-item .channel-name')).map(a => a.textContent))
      .toEqual(['gamer', 'modeler', 'streamer']);
  });
});
