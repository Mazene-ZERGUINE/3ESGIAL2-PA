import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuffix',
})
export class ThousandSuffixPipe implements PipeTransform {
  transform(input: any, args?: any): any {
    let exp;
    const suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

    if (Number.isNaN(input)) {
      return null;
    }
    if (input >= 0 && input < 1000) {
      return input;
    }

    const potentialNegativeSign = input < 0 ? '-' : '';
    const absoluteInput = Math.abs(input);
    exp = Math.floor(Math.log(absoluteInput) / Math.log(1000));
    const result = `${potentialNegativeSign}${(absoluteInput / Math.pow(1000, exp)).toFixed(args)}`;

    return !suffixes[exp - 1] ? `${result} E+` : `${result} ${suffixes[exp - 1]}`;
  }
}
