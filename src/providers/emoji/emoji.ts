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

}
