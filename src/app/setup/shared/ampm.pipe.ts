import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ampm'
})
export class AmpmPipe implements PipeTransform {

  transform(time: any): any {
    if (time.length !== 5 || !time.includes(':')) {
      return '00:00 AM'
    }
    const arr = time.split(':');
    const type = (+arr[0] > 11) ? 'pm' : 'am' ;
    const hour = (+arr[0] <= 12) ? arr[0] : this.get2DigitString(+arr[0]-12);
    return hour + ':' + arr[1] + type;
  }

  get2DigitString(num: number): string {
    return (num < 10) ? '0' + num : '' + num ;   
  }
}
