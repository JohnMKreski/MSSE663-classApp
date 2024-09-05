import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'size',
    standalone: true
  })
  export class SizePipe implements PipeTransform {
    transform(size: number): string {
      return `(${size}")`;
    }
  }