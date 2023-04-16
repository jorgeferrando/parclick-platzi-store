import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageNotFound'
})
export class ImageNotFoundPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.startsWith('http')) {
      return value;
    } else {
      return '/assets/image-not-found.png'
    }
  }

}
