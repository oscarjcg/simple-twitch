import { Component, OnInit } from '@angular/core';
import { DataComponentService } from 'src/app/shared/service/data-component.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Category } from 'src/app/shared/model/category.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  height = '0px';
  category: Category;

  constructor(private dataComponentService: DataComponentService,
              private route: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.height = this.dataComponentService.calculateHeightNoHeader() + 'px';
    const game = this.route.snapshot.params.game;
    this.category = this.categoryService.getCategories().find((value: Category) => {
      return value.name === game;
    });
  }

}
