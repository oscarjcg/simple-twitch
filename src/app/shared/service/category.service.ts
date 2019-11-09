import { Category } from '../model/category.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CategoryService {
    // private categories: Category[] = [
    //     new Category('League of Legends', 'lol.jpg'),
    //     new Category('Grand Theft Auto V', 'gta.jpg'),
    //     new Category('Apex Legends', 'apex.jpg'),
    //     new Category('Counter-Strike: Global Offensive', 'counter-strike.jpg'),
    //     new Category('God of War', 'god-of-war.jpg'),
    //     new Category('Overwatch', 'overwatch.jpg'),
    //     new Category('Tom Clancy\'s Rainbow Six: Siege', 'rainbowsix-siege.jpg')
    // ];
    private categories: Category[] = [];
    categoriesChanged = new Subject<Category[]>();
    // Backend
    // private BASE_URL = 'http://localhost:3000/';
    private BASE_URL = 'https://rocky-forest-64018.herokuapp.com/';


    constructor(private http: HttpClient) {

    }

    fetchCategories() {
        // New copy
        this.http.get<Category[]>(this.BASE_URL + 'categories')
        .subscribe(categories => {
            this.categories = categories.map(
                category => {
                    const base64 = 'data:image/png;base64,' +
                        btoa(new Uint8Array(category.image.data.data).reduce((data, byte) => {
                            return data + String.fromCharCode(byte);
                        }, ''));

                    return {...category, imageBase64: base64};
            });
            // console.log(this.categories);

            this.categoriesChanged.next(this.categories.slice());
        });
    }

    getCategories(): Category[] {
        return this.categories.slice();
    }
}
