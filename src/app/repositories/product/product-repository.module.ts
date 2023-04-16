import {NgModule} from "@angular/core";
import {ProductService} from "./product.service";
import {RestProductService} from "./rest-product.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: ProductService, useClass: RestProductService }
  ]
})
export class ProductRepositoryModule {}
