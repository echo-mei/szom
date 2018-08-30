import { Injectable } from '@angular/core';

import * as stompjs from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebsocketProvider {

  stompClient;

  constructor(
  ) {
  }

  connect(url, callback, errorCallback?) {
    const socket = new SockJS(url) as WebSocket;
    this.stompClient = stompjs.over(socket);
    this.stompClient.connect({}, callback, errorCallback);
    // this.stompClient.heartbeat.outgoing = 10000;
    // this.stompClient.heartbeat.incoming = 0;
  }

  subscribe(url: string, callback, headers?: {}): any {
    return this.stompClient.subscribe(url, callback, headers);
  }

  unsubscribe(subscription) {
    subscription.unsubscribe();
  }

  send(url: string, headers: {}, body: string) {
    this.stompClient.send(url, headers, body);
  }

  close() {
    this.stompClient&&this.stompClient.disconnect();
  }

}
