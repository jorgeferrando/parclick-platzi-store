import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../repositories/product/product.service';
import {
  AppState,
  setData,
  setError,
  setLoading,
} from '../../models/app-state.type';
import { Product } from '../../models/product.type';

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  searchForm = new FormGroup({
    title: new FormControl(''),
  });
  appState$: Observable<AppState> = this.searchForm.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap((form: any) => {
      return this.productService.search(form).pipe(
        map(value => setData(value)),
        catchError(error => of(setError(error.message))),
        startWith(setLoading(true))
      );
    }),
    startWith(setLoading(false))
  );
  constructor(public productService: ProductService, private router: Router) {}

  goToAdvancedSearch() {
    this.router.navigate([`advanced-search`], {
      queryParams: {
        title: this.searchForm.value.title,
      },
    });
  }

  trackByProducts(index: number, product: Product): number {
    return product.id;
  }
}
