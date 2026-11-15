import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { makeCategories } from '../../../../testing/fixtures';
import { CategoryItemComponent } from './category-item.component';

describe('CategoryItemComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryItemComponent],
      providers: [provideRouter([])],
    });
  });

  it('shows the category image and a link to its game page', () => {
    const fixture = TestBed.createComponent(CategoryItemComponent);
    fixture.componentRef.setInput('category', makeCategories()[0]);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    const img = el.querySelector('img');
    expect(img.getAttribute('src')).toBe('img/lol.jpg');
    expect(img.getAttribute('alt')).toBe('League of Legends');

    const link = el.querySelector('a.name');
    expect(link.textContent).toBe('League of Legends');
    expect(link.getAttribute('href')).toBe('/directory/game/League%20of%20Legends');
  });
});
