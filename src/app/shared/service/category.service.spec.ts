import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Category } from '../model/category.model';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CategoryService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('starts with no categories', () => {
    expect(service.getCategories()).toEqual([]);
  });

  it('fetches categories, copies image into imageBase64 and emits them', () => {
    const emitted: Category[][] = [];
    service.categoriesChanged.subscribe(c => emitted.push(c));

    service.fetchCategories();

    const req = http.expectOne(environment.apiUrl + 'category');
    expect(req.request.method).toBe('GET');
    req.flush([
      { name: 'LoL', image: 'lol.jpg', imageBase64: null },
      { name: 'Apex', image: 'apex.jpg', imageBase64: null },
    ]);

    expect(emitted.length).toBe(1);
    expect(emitted[0]).toEqual([
      { name: 'LoL', image: 'lol.jpg', imageBase64: 'lol.jpg' },
      { name: 'Apex', image: 'apex.jpg', imageBase64: 'apex.jpg' },
    ]);
    expect(service.getCategories().map(c => c.name)).toEqual(['LoL', 'Apex']);
  });

  it('getCategories returns a copy', () => {
    service.fetchCategories();
    http.expectOne(environment.apiUrl + 'category').flush([{ name: 'LoL', image: 'a', imageBase64: '' }]);

    const copy = service.getCategories();
    copy.pop();

    expect(service.getCategories().length).toBe(1);
  });
});
