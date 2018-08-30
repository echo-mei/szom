import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the HowLongAgoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'howLongAgo',
})
export class HowLongAgoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {

    let time, date3, date1;
    
    time = new Date();
    date1 = new Date(value);
    // return date;
    date3 = time.getTime() - date1.getTime();

    var years = Math.floor(date3 / (365.25 * 24 * 3600 * 1000));
    if( years > 0 ){
      return `${years}年前`;
    }

    var months = Math.floor(date3 / (30.4375 * 24 * 3600 * 1000));
    if( months > 0 ){
      return `${months}个月前`;
    }

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000))
    if ( days > 0 ) {
      return `${days}天前`;
    }

    //计算天数后剩余的毫秒数
    var leave1 = date3 % (24 * 3600 * 1000);

    var hours = Math.floor(leave1 / (3600 * 1000));
    if ( hours > 0 ) {
      return `${hours}小时前`;
    }

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));

    if (minutes > 5) {
      return `${minutes}分钟前`;
    }
    else{
      return `5分钟前`;
    }
    
    //计算相差秒数
    // var leave3 = leave2 % (60 * 1000);
    // var seconds = Math.round(leave3 / 1000);

    // if (seconds > 1) {
    //   return `${seconds}秒前`;
    // }
  }
}
