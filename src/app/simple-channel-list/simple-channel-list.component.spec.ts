import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DataComponentService } from '../shared/service/data-component.service';
import { makeChannels } from '../../testing/fixtures';
import { createChannelServiceStub, provideChannelStub } from '../../testing/service-stubs';
import { SimpleChannelListComponent } from './simple-channel-list.component';

describe('SimpleChannelListComponent', () => {
  let channelService: ReturnType<typeof createChannelServiceStub>;

  beforeEach(() => {
    channelService = createChannelServiceStub();
    TestBed.configureTestingModule({
      imports: [SimpleChannelListComponent],
      providers: [provideRouter([]), provideChannelStub(channelService)],
    });
  });

  it('fetches channels and renders one item per channel', () => {
    const fixture = TestBed.createComponent(SimpleChannelListComponent);
    fixture.detectChanges();
    expect(channelService.fetchChannels).toHaveBeenCalledTimes(1);

    channelService.channelChanged.next(makeChannels());
    fixture.detectChanges();

    const names = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.channel-name'))
      .map(p => p.textContent.trim());
    expect(names).toEqual(['gamer', 'modeler', 'streamer']);
    expect(fixture.nativeElement.querySelector('.title').textContent).toContain('Popular channels');
  });

  it('sizes the list to the space below the header on resize', () => {
    TestBed.inject(DataComponentService).heightHeader = 100;
    const fixture = TestBed.createComponent(SimpleChannelListComponent);
    fixture.detectChanges();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    const expected = `${window.innerHeight - 100}px`;
    expect(fixture.componentInstance.heightList).toBe(expected);
    expect(fixture.nativeElement.querySelector('.main-container').style.height).toBe(expected);
  });
});
