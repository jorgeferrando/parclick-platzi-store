import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../repositories/product/product.service';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvancedSearchPageComponent } from './advanced-search-page.component';
import { CategoryService } from '../../repositories/category/category.service';
import { Category } from '../../models/category.type';
import { AdvancedFilterComponent } from '../../components/advanced-filter/advanced-filter.component';
import { ProductComponent } from '../../components/product/product.component';
import { ImageNotFoundPipe } from '../../components/product/image-not-found.pipe';
import { AdvacedSearchQueryParams } from '../../models/advanced-search-query-params.type';

const mockData = [
  {
    id: 4,
    title: 'Handmade Fresh Table',
    price: 687,
    description: 'Andy shoes are designed to keeping in...',
    category: {
      id: 5,
      name: 'Others',
      image: 'https://placeimg.com/640/480/any?r=0.591926261873231',
    },
    images: [
      'https://placeimg.com/640/480/any?r=0.9178516507833767',
      'https://placeimg.com/640/480/any?r=0.9300320592588625',
      'https://placeimg.com/640/480/any?r=0.8807778235430017',
    ],
  },
];

@Injectable()
class ActivatedRouteMock {
  queryParams = of({
    title: 'Handmade',
  });
}

@Injectable()
class MockProductService {
  search(params: any) {
    return of(mockData);
  }
}

@Injectable()
export abstract class MockCategoryService {
  protected constructor() {}

  getAll(): Observable<Category[]> {
    return of([
      {
        id: 1,
        name: 'Clothes',
        image: 'https://api.lorem.space/image/fashion?w=640&h=480&r=4278',
      },
    ] as Category[]);
  }
}

describe('AdvancedSearchPageComponent', () => {
  let component: AdvancedSearchPageComponent;
  let fixture: ComponentFixture<AdvancedSearchPageComponent>;
  let router: Router;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
      declarations: [
        AdvancedSearchPageComponent,
        AdvancedFilterComponent,
        ProductComponent,
        ImageNotFoundPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvancedSearchPageComponent);
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set error if search fails called with  query params', () => {
    const spy = spyOn(productService, 'search').and.returnValue(
      throwError(() => new Error('Mocked error'))
    );
    let counter = 0;
    component.appState$.subscribe(value => {
      console.log(value);
      // 1 - setLoading -> true
      // 2 - setLoading -> false, setData -> mockData
      switch (counter) {
        case 0:
          expect(value).toEqual({ loading: true, data: [], error: null });
          break;
        case 1:
          expect(value).toEqual({
            loading: false,
            data: [],
            error: 'Mocked error',
          });
          break;
      }
      counter++;
    });
    expect(spy).toHaveBeenCalledOnceWith({
      title: 'Handmade',
    } as AdvacedSearchQueryParams);
  });

  it('should load data from query params', () => {
    const spy = spyOn(productService, 'search').and.returnValue(of(mockData));
    let counter = 0;
    component.appState$.subscribe(value => {
      console.log(value);
      // 1 - setLoading -> true
      // 2 - setLoading -> false, setData -> mockData
      switch (counter) {
        case 0:
          expect(value).toEqual({ loading: true, data: [], error: null });
          break;
        case 1:
          expect(value).toEqual({
            loading: false,
            data: mockData,
            error: null,
          });
          break;
      }
      counter++;
    });
    expect(spy).toHaveBeenCalledOnceWith({
      title: 'Handmade',
    } as AdvacedSearchQueryParams);
  });
});
