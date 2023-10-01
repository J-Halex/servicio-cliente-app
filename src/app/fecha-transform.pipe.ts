import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaTransform'
})
export class FechaTransformPipe implements PipeTransform {

  transform(timestamp: number): string {
    const date = new Date(timestamp);

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('es-ES');
  }

}
