import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { makeChannels } from '../../../../testing/fixtures';
import { ChannelItemComponent } from './channel-item.component';

describe('ChannelItemComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChannelItemComponent],
      providers: [provideRouter([])],
    });
  });

  it('shows the preview, the avatar and a link to the channel', () => {
    const fixture = TestBed.createComponent(ChannelItemComponent);
    fixture.componentRef.setInput('channel', makeChannels()[1]);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    const [preview, avatar] = Array.from(el.querySelectorAll('img'));
    expect(preview.getAttribute('src')).toBe('img/live.jpg');
    expect(avatar.getAttribute('src')).toBe('img/c2.png');
    expect(avatar.getAttribute('alt')).toBe('modeler');

    const link = el.querySelector('a.channel-name');
    expect(link.textContent).toBe('modeler');
    expect(link.getAttribute('href')).toBe('/modeler');
  });
});
