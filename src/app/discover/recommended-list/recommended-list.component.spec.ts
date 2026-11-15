import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Category } from '../../shared/model/category.model';
import { makeChannels } from '../../../testing/fixtures';
import {
  createCategoryServiceStub,
  createChannelServiceStub,
  provideCategoryStub,
  provideChannelStub,
  setElementSize,
} from '../../../testing/service-stubs';
import { RecommendedListComponent } from './recommended-list.component';

describe('RecommendedListComponent', () => {
  let categoryService: ReturnType<typeof createCategoryServiceStub>;
  let channelService: ReturnType<typeof createChannelServiceStub>;

  const sevenCategories = Array.from({ length: 7 }, (_, i) => new Category(`Game ${i}`, `img/${i}.jpg`, `img/${i}.jpg`));

  beforeEach(() => {
    categoryService = createCategoryServiceStub(sevenCategories);
    channelService = createChannelServiceStub(makeChannels());
    TestBed.configureTestingModule({
      imports: [RecommendedListComponent],
      providers: [provideRouter([]), provideCategoryStub(categoryService), provideChannelStub(channelService)],
    });
  });

  function create(category: string, width: number) {
    const fixture = TestBed.createComponent(RecommendedListComponent);
    fixture.componentRef.setInput('category', category);
    setElementSize(fixture.nativeElement.querySelector('.main-container'), { clientWidth: width });
    fixture.detectChanges();
    return fixture;
  }

  const count = (el: HTMLElement, selector: string) => el.querySelectorAll(selector).length;

  describe('categories', () => {
    it('shows one row of categories and a "Show more" button', () => {
      const fixture = create('categories', 500);
      const el: HTMLElement = fixture.nativeElement;
      expect(categoryService.fetchCategories).toHaveBeenCalledTimes(1);
      expect(channelService.fetchChannels).not.toHaveBeenCalled();
      expect(el.querySelector('app-spinner')).not.toBeNull();

      categoryService.categoriesChanged.next(sevenCategories);
      fixture.detectChanges();

      expect(el.querySelector('app-spinner')).toBeNull();
      expect(el.querySelector('.title').textContent).toContain('categories');
      expect(count(el, 'app-category-item')).toBe(3);
      expect(el.querySelector('.more')).not.toBeNull();
    });

    it('"Show more" shows a second row and hides the button', () => {
      const fixture = create('categories', 500);
      categoryService.categoriesChanged.next(sevenCategories);
      fixture.detectChanges();

      fixture.nativeElement.querySelector('.more').click();
      fixture.detectChanges();

      expect(count(fixture.nativeElement, 'app-category-item')).toBe(6);
      expect(fixture.nativeElement.querySelector('.more')).toBeNull();
    });

    it('goes back to one row when the window is resized', () => {
      const fixture = create('categories', 500);
      categoryService.categoriesChanged.next(sevenCategories);
      fixture.componentInstance.onMore();
      fixture.detectChanges();

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(count(fixture.nativeElement, 'app-category-item')).toBe(3);
      expect(fixture.componentInstance.more).toBe(true);
    });

    it('hides "Show more" when every category already fits', () => {
      const fixture = create('categories', 2000);
      categoryService.categoriesChanged.next(sevenCategories);
      fixture.detectChanges();

      expect(count(fixture.nativeElement, 'app-category-item')).toBe(7);
      expect(fixture.nativeElement.querySelector('.more')).toBeNull();
    });
  });

  describe('channels', () => {
    it('loads channels for any other category and shows one row', () => {
      const fixture = create('Simulation', 700);
      expect(channelService.fetchChannels).toHaveBeenCalledTimes(1);
      expect(categoryService.fetchCategories).not.toHaveBeenCalled();

      channelService.channelChanged.next(makeChannels());
      fixture.detectChanges();

      expect(count(fixture.nativeElement, 'app-channel-item')).toBe(2);
      expect(count(fixture.nativeElement, 'app-category-item')).toBe(0);
      expect(fixture.componentInstance.more).toBe(true);
    });

    it('"Show more" shows the remaining channels', () => {
      const fixture = create('Simulation', 700);
      channelService.channelChanged.next(makeChannels());

      fixture.componentInstance.onMore();
      fixture.detectChanges();

      expect(count(fixture.nativeElement, 'app-channel-item')).toBe(3);
      expect(fixture.componentInstance.more).toBe(false);
    });
  });
});
