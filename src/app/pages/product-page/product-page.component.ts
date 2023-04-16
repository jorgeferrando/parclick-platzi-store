import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {ProductService} from "../../services/product.service";
import {BehaviorSubject, throwError} from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.sass']
})
export class ProductPageComponent {
  loading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject(null);
  product$ = this.activatedRoute.params.pipe(
    tap(() => {
      this.loading$.next(true);
      this.error$.next(null) }
    ),
    map(params => +params['id']),
    switchMap(id => this.productService.getById(id)),
    catchError((err) => {
      this.error$.next(err.message);
      this.loading$.next(false);
      return throwError(err);
    }),
    tap(() => {
      this.loading$.next(false);
    })
  );

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }
}
