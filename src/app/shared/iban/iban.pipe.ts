import { Pipe, PipeTransform } from '@angular/core';

import {Iban} from './iban';

@Pipe({
  name: 'iban'
})
export class IbanPipe implements PipeTransform {

  transform(value: string, separator: string): any {
    let sep = '-';
    if (separator) {
      sep = separator;
    }
    return Iban.format(value, sep);
  }

}
