import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProductPageComponent} from "./product-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductModule} from "../../components/product/product.module";
import {ProductRepositoryModule} from "../../repositories/product/product-repository.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProductModule,
    ProductRepositoryModule,
    RouterModule.forChild([{path: "", component: ProductPageComponent }])
  ],
  declarations: [
    ProductPageComponent
  ],
  exports: [
    RouterModule,
    ProductPageComponent
  ]
})
export class ProductPageModule {}
