import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { makeChannels } from '../../../testing/fixtures';
import { resizeWindow } from '../../../testing/service-stubs';
import { HeaderChannelComponent } from './header-channel.component';

describe('HeaderChannelComponent', () => {
  let restoreWindow: (() => void) | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderChannelComponent],
      providers: [provideRouter([])],
    });
  });

  afterEach(() => restoreWindow?.());

  it('shows a spinner while there is no channel', () => {
    const fixture = TestBed.createComponent(HeaderChannelComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-spinner')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.channel-name')).toBeNull();
  });

  it('shows the channel name, avatar and Home link', () => {
    const fixture = TestBed.createComponent(HeaderChannelComponent);
    fixture.componentRef.setInput('channel', makeChannels()[0]);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('app-spinner')).toBeNull();
    expect(el.querySelector('.channel-name').textContent).toBe('gamer');
    expect(el.querySelector('img').getAttribute('src')).toBe('img/c1.jpg');
    const home = el.querySelector('.navbar-nav a');
    expect(home.textContent).toBe('Home');
    expect(home.getAttribute('href')).toBe('/gamer');
  });

  it('collapses the nav on small screens', () => {
    const fixture = TestBed.createComponent(HeaderChannelComponent);
    fixture.componentRef.setInput('channel', makeChannels()[0]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.navbar-nav').classList).not.toContain('collapse');

    restoreWindow = resizeWindow(500);
    fixture.detectChanges();

    expect(fixture.componentInstance.smallScreen).toBe(true);
    expect(fixture.nativeElement.querySelector('.navbar-nav').classList).toContain('collapse');
  });
});
