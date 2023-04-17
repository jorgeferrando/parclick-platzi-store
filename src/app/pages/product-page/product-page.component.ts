import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ProductService } from '../../repositories/product/product.service';
import { Observable, of } from 'rxjs';
import {
  AppState,
  setData,
  setError,
  setLoading,
} from '../../models/app-state.type';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {
  appState$: Observable<AppState> = this.activatedRoute.params.pipe(
    map(params => +params['id']),
    switchMap(id =>
      this.productService.getById(id).pipe(
        map(value => setData(value)),
        catchError(error => of(setError(error.message))),
        startWith(setLoading(true))
      )
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
}
