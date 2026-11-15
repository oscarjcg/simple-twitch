import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { makeCategories } from '../../../testing/fixtures';
import { createCategoryServiceStub, provideCategoryStub } from '../../../testing/service-stubs';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let categoryService: ReturnType<typeof createCategoryServiceStub>;

  beforeEach(() => {
    categoryService = createCategoryServiceStub();
    TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [provideRouter([]), provideCategoryStub(categoryService)],
    });
  });

  function create(game: string) {
    const fixture = TestBed.createComponent(GameComponent);
    fixture.componentRef.setInput('game', game);
    fixture.detectChanges();
    return fixture;
  }

  it('shows a spinner, then the header of the selected game', () => {
    const fixture = create('Overwatch');
    const el: HTMLElement = fixture.nativeElement;
    expect(categoryService.fetchCategories).toHaveBeenCalledTimes(1);
    expect(el.querySelector('app-spinner')).not.toBeNull();

    categoryService.categoriesChanged.next(makeCategories());
    fixture.detectChanges();

    expect(el.querySelector('app-spinner')).toBeNull();
    expect(el.querySelector('.header h1').textContent).toBe('Overwatch');
    expect(el.querySelector('.header img').getAttribute('src')).toBe('img/overwatch.jpg');
  });

  it('links the Live Channels tab to the game page', () => {
    const el: HTMLElement = create('Overwatch').nativeElement;

    const tab = el.querySelector('a.feature-title');
    expect(tab.textContent).toBe('Live Channels');
    expect(tab.getAttribute('href')).toBe('/directory/game/Overwatch');
  });

  it('does not crash for a game that is not in the list', () => {
    const fixture = create('Unknown game');

    categoryService.categoriesChanged.next(makeCategories());
    fixture.detectChanges();

    expect(fixture.componentInstance.category).toBeUndefined();
    expect(fixture.nativeElement.querySelector('.header')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-spinner')).toBeNull();
  });
});
