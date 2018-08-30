import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DigitalChineseConversionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'digitalChineseConversion',
})
export class DigitalChineseConversionPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let conversion = ['十','百','千'],
    Position = ['','一','二','三','四','五','六','七','八','九'],
    num = [];
    num[0] = parseInt(value) %10;
    num[1] = Math.floor(parseInt(value) /10) %10;
    if( num[1] == 0 ) {
      num[0] == 2? Position[2] = "两":'';
      return Position[num[0]];
    }
    num[2] =  Math.floor(parseInt(value) /100) %10;
    if( num[2] == 0 ) {
      num[1] == 1? Position[1] = '':'';
      return Position[num[1]] + conversion[0] + Position[num[0]];
    }

  }
}
