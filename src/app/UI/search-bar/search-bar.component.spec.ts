import { TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  it('renders a search input', () => {
    const fixture = TestBed.createComponent(SearchBarComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Search');
  });
});
