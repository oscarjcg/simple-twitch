import { Component, OnInit, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from 'src/app/shared/model/category.model';
import { CategoryService } from 'src/app/shared/service/category.service';
import { SpinnerComponent } from '../../UI/spinner/spinner.component';
import { CategoryItemComponent } from './category-item/category-item.component';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SpinnerComponent, CategoryItemComponent]
})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private destroyRef = inject(DestroyRef);

  categories: Category[] = [];
  isFetching = true;

  ngOnInit() {
    this.categoryService.categoriesChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isFetching = false;
      });
    this.categoryService.fetchCategories();
  }
}
