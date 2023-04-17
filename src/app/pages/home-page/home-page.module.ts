import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductRepositoryModule } from '../../repositories/product/product-repository.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProductRepositoryModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }]),
  ],
  declarations: [HomePageComponent],
  exports: [RouterModule, HomePageComponent],
})
export class HomePageModule {}
