import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DataComponentService } from '../shared/service/data-component.service';
import { setElementSize } from '../../testing/service-stubs';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    });
  });

  it('shows the brand, the nav links and the search bar', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('.navbar-brand')?.textContent).toContain('Simple Twitch');
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('.navbar-nav a'));
    expect(links.map(a => [a.textContent.trim(), a.getAttribute('href')])).toEqual([
      ['Discover', '/'],
      ['Browse', '/directory'],
    ]);
    expect(el.querySelector('app-search-bar')).not.toBeNull();
  });

  it('stores its height in DataComponentService after the view is ready', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    setElementSize(fixture.nativeElement.querySelector('.main-container'), { clientHeight: 64 });

    fixture.detectChanges();

    expect(TestBed.inject(DataComponentService).heightHeader).toBe(64);
  });
});
