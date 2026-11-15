import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DataComponentService } from '../shared/service/data-component.service';
import { BrowseComponent } from './browse.component';

describe('BrowseComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowseComponent],
      providers: [provideRouter([])],
    });
  });

  it('fills the space below the header', () => {
    TestBed.inject(DataComponentService).heightHeader = 80;
    const fixture = TestBed.createComponent(BrowseComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.height).toBe(`${window.innerHeight - 80}px`);
    expect(fixture.nativeElement.querySelector('.main-container').style.height).toBe(`${window.innerHeight - 80}px`);
  });

  it('shows the Categories and Live Channels tabs and a search bar', () => {
    const fixture = TestBed.createComponent(BrowseComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('h1').textContent).toBe('Browse');
    const tabs = Array.from(el.querySelectorAll<HTMLAnchorElement>('a.feature-title'));
    expect(tabs.map(a => [a.textContent, a.getAttribute('href')])).toEqual([
      ['Categories', '/directory'],
      ['Live Channels', '/directory/all'],
    ]);
    expect(el.querySelector('app-search-bar')).not.toBeNull();
  });
});
