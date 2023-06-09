import { NgModule } from '@angular/core';
import { AdvancedSearchPageComponent } from './advanced-search-page.component';
import { RouterModule } from '@angular/router';
import { AdvancedFilterModule } from '../../components/advanced-filter/advanced-filter.module';
import { ProductModule } from '../../components/product/product.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRepositoryModule } from '../../repositories/product/product-repository.module';
import { CategoryRepositoryModule } from '../../repositories/category/category-repository.module';
import { CommonModule } from '@angular/common';
import { ImageNotFoundPipeModule } from '../../pipes/image-not-found.pipe.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdvancedFilterModule,
    ProductModule,
    ProductRepositoryModule,
    CategoryRepositoryModule,
    ImageNotFoundPipeModule,
    RouterModule.forChild([
      { path: '', component: AdvancedSearchPageComponent },
    ]),
  ],
  declarations: [AdvancedSearchPageComponent],
  exports: [RouterModule, AdvancedSearchPageComponent],
})
export class AdvancedSearchPageModule {}
