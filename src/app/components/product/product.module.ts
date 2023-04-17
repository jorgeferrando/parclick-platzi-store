import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { ImageNotFoundPipe } from './image-not-found.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageNotFoundPipe, ProductComponent],
  exports: [ProductComponent],
})
export class ProductModule {}
