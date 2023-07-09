import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'dateToNow',
})
export class DateToNowPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const newDate = new Date(String(value));

    return formatDistanceToNow(new Date(newDate), { locale: fr });
  }
}
