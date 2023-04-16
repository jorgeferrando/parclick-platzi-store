import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Product} from "../../models/product.type";
import {map, switchMap} from "rxjs/operators";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.sass']
})
export class ProductPageComponent {

  product$: Observable<Product | null> | null = null;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.product$ = this.activatedRoute.params.pipe(
      map(params => +params['id']),
      switchMap(id => this.productService.getById(id))
    );
  }
}
