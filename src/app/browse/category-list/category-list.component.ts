import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/shared/model/category.model';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  subs: Subscription;
  isFetching = true;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.subs = this.categoryService.categoriesChanged
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isFetching = false;
      });
    this.categoryService.fetchCategories();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
