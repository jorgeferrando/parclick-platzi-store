import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductPageComponent } from './product-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from '../../components/product/product.module';
import { ProductRepositoryModule } from '../../repositories/product/product-repository.module';
import { CommonModule } from '@angular/common';
import { ImageNotFoundPipeModule } from '../../pipes/image-not-found.pipe.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProductModule,
    ProductRepositoryModule,
    ImageNotFoundPipeModule,
    RouterModule.forChild([{ path: '', component: ProductPageComponent }]),
  ],
  declarations: [ProductPageComponent],
  exports: [RouterModule, ProductPageComponent],
})
export class ProductPageModule {}
