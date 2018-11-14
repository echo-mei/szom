import { Injectable } from '@angular/core';
import { HttpUrlEncodingCodec } from '../../../node_modules/@angular/common/http';

@Injectable()
export class EmojiProvider {

  httpUrlEncodingCodec = new HttpUrlEncodingCodec();

  constructor(

  ) {

  }

  emojiConvery(value) {
    return this.httpUrlEncodingCodec.encodeValue(value);
  }

  emojiRecovery(value) {
    return this.httpUrlEncodingCodec.decodeValue(value);
  }

  filterEmoji(str) {
    let ranges = '(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])';
    return str.replace(new RegExp(ranges, 'g'), '');
  }

  hasEmoji(str) {
    let ranges = '(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])';
    if(str.match(new RegExp(ranges, 'g'))) {
      return true;
    }
    return false;
  }

}
