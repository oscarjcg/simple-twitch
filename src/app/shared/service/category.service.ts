import { Category } from '../model/category.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CategoryService {

  private categories: Category[] = [];
  categoriesChanged = new Subject<Category[]>();
 
  //private BASE_URL = 'http://localhost:8086/api/';
  private BASE_URL = 'https://st-dotnet.oscarcatarigutierrez.com/api/';


  constructor(private http: HttpClient) {

  }

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
