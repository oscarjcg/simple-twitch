import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { makeChannels } from '../../../testing/fixtures';
import { SimpleChannelItemComponent } from './simple-channel-item.component';

describe('SimpleChannelItemComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SimpleChannelItemComponent],
      providers: [provideRouter([])],
    });
  });

  function create() {
    const fixture = TestBed.createComponent(SimpleChannelItemComponent);
    fixture.componentRef.setInput('channel', makeChannels()[0]);
    fixture.detectChanges();
    return fixture;
  }

  it('shows the channel avatar and name', () => {
    const el: HTMLElement = create().nativeElement;

    expect(el.querySelector('.channel-name').textContent.trim()).toBe('gamer');
    expect(el.querySelector('img').getAttribute('src')).toBe('img/c1.jpg');
  });

  it('navigates to the channel page on click', () => {
    const fixture = create();
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture.nativeElement.querySelector('.main-container').click();

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(router.serializeUrl(navigate.mock.calls[0][0] as any)).toBe('/gamer');
  });
});
