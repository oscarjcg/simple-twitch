import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/shared/model/category.model';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category;

  constructor() { }

  ngOnInit() {

  }

}
