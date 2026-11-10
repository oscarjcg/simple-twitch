import { Component, OnInit, ChangeDetectionStrategy, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { DataComponentService } from 'src/app/shared/service/data-component.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Category } from 'src/app/shared/model/category.model';
import { SpinnerComponent } from '../../UI/spinner/spinner.component';
import { SearchBarComponent } from '../../UI/search-bar/search-bar.component';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SpinnerComponent, RouterLinkActive, RouterLink, SearchBarComponent, RouterOutlet]
})
export class GameComponent implements OnInit {
  private dataComponentService = inject(DataComponentService);
  private categoryService = inject(CategoryService);
  private destroyRef = inject(DestroyRef);

  readonly game = input<string>('');

  height = '0px';
  category: Category;
  isFetching = true;

  ngOnInit() {
    this.height = this.dataComponentService.calculateHeightNoHeader() + 'px';

    this.categoryService.categoriesChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(categories => {
        this.category = categories.find(value => value.name === this.game());
        this.isFetching = false;
      });
    this.categoryService.fetchCategories();
  }
}
