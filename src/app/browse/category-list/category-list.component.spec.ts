import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { makeCategories } from '../../../testing/fixtures';
import { createCategoryServiceStub, provideCategoryStub } from '../../../testing/service-stubs';
import { CategoryListComponent } from './category-list.component';

describe('CategoryListComponent', () => {
  let categoryService: ReturnType<typeof createCategoryServiceStub>;

  beforeEach(() => {
    categoryService = createCategoryServiceStub();
    TestBed.configureTestingModule({
      imports: [CategoryListComponent],
      providers: [provideRouter([]), provideCategoryStub(categoryService)],
    });
  });

  it('shows a spinner until the categories arrive, then renders them', () => {
    const fixture = TestBed.createComponent(CategoryListComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(categoryService.fetchCategories).toHaveBeenCalledTimes(1);
    expect(el.querySelector('app-spinner')).not.toBeNull();
    expect(el.querySelectorAll('app-category-item').length).toBe(0);

    categoryService.categoriesChanged.next(makeCategories());
    fixture.detectChanges();

    expect(el.querySelector('app-spinner')).toBeNull();
    expect(Array.from(el.querySelectorAll('app-category-item .name')).map(a => a.textContent))
      .toEqual(['League of Legends', 'Overwatch', 'Apex']);
  });
});
