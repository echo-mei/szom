import { Injectable } from '@angular/core';

import * as stompjs from 'stompjs';
import * as SockJS from 'sockjs-client';
import { StorageProvider } from '../storage/storage';
import { WEBSOCKET_URL } from '../../config';

@Injectable()
export class WebsocketProvider {

  stompClient;

  constructor(
    public storage: StorageProvider
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

  connectWebsocket() {
    this.connect(WEBSOCKET_URL, () => {
      if(!this.storage.get('user')) {return;}
      // 新的关注
      this.subscribe(
        `/attention/notifications/${JSON.parse(this.storage.get('user')).userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('ws-addresslist');
            this.storage.set('ws-addresslist', 'Y');
            // this.events.publish('ws-addresslist');
          }
        }
      );
      // 干部动态-关注
      this.subscribe(
        `/attentionDynamicMessage/notifications/${JSON.parse(this.storage.get('user')).userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('ws-dynamic-attention');
            this.storage.set('ws-dynamic-attention', 'Y');
            // this.events.publish('ws-dynamic-attention');
          }
        }
      );
      // 干部动态-本单位
      this.subscribe(
        `/unitDynamicMessage/notifications/${JSON.parse(this.storage.get('user')).userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('ws-dynamic-unit');
            this.storage.set('ws-dynamic-unit', 'Y');
            // this.events.publish('ws-dynamic-unit');
          }
        }
      );
      // 干部动态-领导批赞-单位领导
      this.subscribe(
        `/leaderLikeDynamicMessage/notifications/unitId/${JSON.parse(this.storage.get('user')).orgCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('ws-dynamic-leader-unit');
            this.storage.set('ws-dynamic-leader-unit', 'Y');
            // this.events.publish('ws-dynamic-leader-unit');
          }
        }
      );
      // 干部动态-领导批赞-市领导
      this.subscribe(
        `/leaderLikeDynamicMessage/notifications/all`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('ws-dynamic-leader-all');
            this.storage.set('ws-dynamic-leader-all', 'Y');
            // this.events.publish('ws-dynamic-leader-all');
          }
        }
      );
      // 干部动态
      this.subscribe(
        `/dynamicMessage/notifications/userCode/${JSON.parse(this.storage.get('user')).userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('/dynamicMessage/notifications/userCode/');
            this.storage.set('ws-dynamic', 'Y');
            // this.events.publish('ws-dynamic');
          }
        }
      );
      // 干部动态
      this.subscribe(
        `/dynamicMessage/notifications/unitId/${JSON.parse(this.storage.get('user')).orgCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('/dynamicMessage/notifications/unitId/');
            this.storage.set('ws-dynamic', 'Y');
            // this.events.publish('ws-dynamic');
          }
        }
      );
      // 干部动态
      this.subscribe(
        `/dynamicMessage/notifications/all`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('/dynamicMessage/notifications/all');
            this.storage.set('ws-dynamic', 'Y');
            // this.events.publish('ws-dynamic');
          }
        }
      );
    }, () => {
      setTimeout(() => {
        this.connectWebsocket();
      }, 1000);
    });
  }

}
