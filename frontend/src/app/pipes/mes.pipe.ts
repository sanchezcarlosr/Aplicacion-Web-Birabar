import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mes'
})
export class MesPipe implements PipeTransform {
  transform(value: number): string {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    if (value >= 1 && value <= 12) {
      return months[value - 1];
    } else {
      return 'Todos los Meses';
    }
  }

}
