import { Category } from '../model/category.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CategoryService {
    private categories: Category[] = [
        new Category('League of Legends', 'lol.jpg'),
        new Category('Grand Theft Auto V', 'gta.jpg'),
        new Category('Apex Legends', 'apex.jpg'),
        new Category('Counter-Strike: Global Offensive', 'counter-strike.jpg'),
        new Category('God of War', 'god-of-war.jpg'),
        new Category('Overwatch', 'overwatch.jpg'),
        new Category('Tom Clancy\'s Rainbow Six: Siege', 'rainbowsix-siege.jpg')
    ];

    constructor() {

    }

    getCategories() {
        // Copy
        return this.categories.slice();
    }
}
