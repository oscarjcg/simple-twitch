import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataComponentService } from 'src/app/shared/service/data-component.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Category } from 'src/app/shared/model/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  height = '0px';
  category: Category;
  subs: Subscription;
  isFetching = true;
  game = '';

  constructor(private dataComponentService: DataComponentService,
              private route: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.height = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.game = this.route.snapshot.params.game;

    this.subs = this.categoryService.categoriesChanged
      .subscribe((categories: Category[]) => {
        this.category = this.categoryService.getCategories().find((value: Category) => {
          return value.name === this.game;
        });
        this.isFetching = false;
      });
    this.categoryService.fetchCategories();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
