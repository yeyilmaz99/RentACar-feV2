import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteToImage'
})
export class ByteToImagePipe implements PipeTransform {
  transform(byteArray: Uint8Array, imageName: string): string {
    const uint8Array = new Uint8Array(byteArray);
    const blob = new Blob([uint8Array]);
    return URL.createObjectURL(blob);
  }
}
