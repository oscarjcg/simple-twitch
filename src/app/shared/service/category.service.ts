import { environment } from '../../../environments/environment';
import { Category } from '../model/category.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private http = inject(HttpClient);


  private categories: Category[] = [];
  categoriesChanged = new Subject<Category[]>();
 
  private BASE_URL = environment.apiUrl;

  fetchCategories() {
    // New copy
    this.http.get<Category[]>(this.BASE_URL + 'category')
      .subscribe(categories => {
        this.categories = categories.map(
          category => {
            return {...category, imageBase64: category.image};
          });
        //console.log(this.categories);

        this.categoriesChanged.next(this.categories.slice());
      });
  }

  getCategories(): Category[] {
    return this.categories.slice();
  }
}
