import { NgModule } from '@angular/core';
import { ImageNotFoundPipe } from './image-not-found.pipe';

@NgModule({
  declarations: [ImageNotFoundPipe],
  exports: [ImageNotFoundPipe],
})
export class ImageNotFoundPipeModule {}
