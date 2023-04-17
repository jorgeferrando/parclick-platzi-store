import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../repositories/product/product.service';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

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
class MockProductService {
  search(params: any) {
    return of(mockData);
  }
}

describe('HomePageComponentComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
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
      providers: [{ provide: ProductService, useClass: MockProductService }],
      declarations: [HomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to advanced-search goToAdvancedSearch is called', () => {
    const spy = spyOn(router, 'navigate');
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(['advanced-search'], {
      queryParams: { title: '' },
    });
  });

  it('should set error if search fails', fakeAsync(() => {
    let counter = 0;
    component.appState$.subscribe(value => {
      // 0 - startWith
      // 1 - setLoading -> true
      // 2 - setLoading -> false, setData -> mockData
      switch (counter) {
        case 0:
          expect(value).toEqual({ loading: false, data: [], error: null });
          break;
        case 1:
          expect(value).toEqual({ loading: true, data: [], error: null });
          break;
        case 2:
          expect(value).toEqual({
            loading: false,
            data: [],
            error: 'Mocked error',
          });
          break;
      }
      counter++;
    });
    const spy = spyOn(productService, 'search').and.returnValue(
      throwError(() => new Error('Mocked error'))
    );
    const input = fixture.nativeElement.querySelector('#search');
    input.value = 'Handmade';
    input.dispatchEvent(new Event('input'));
    tick(1000);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

  it('should load data from search', fakeAsync(() => {
    let counter = 0;
    component.appState$.subscribe(value => {
      // 0 - startWith
      // 1 - setLoading -> true
      // 2 - setLoading -> false, setData -> mockData
      switch (counter) {
        case 0:
          expect(value).toEqual({ loading: false, data: [], error: null });
          break;
        case 1:
          expect(value).toEqual({ loading: true, data: [], error: null });
          break;
        case 2:
          expect(value).toEqual({
            loading: false,
            data: mockData,
            error: null,
          });
          break;
      }
      counter++;
    });
    const spy = spyOn(productService, 'search').and.returnValue(of(mockData));
    const input = fixture.nativeElement.querySelector('#search');
    input.value = 'Handmade';
    input.dispatchEvent(new Event('input'));
    tick(1000);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));
});
