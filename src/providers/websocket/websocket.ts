import { Injectable } from '@angular/core';

import * as stompjs from 'stompjs';
import * as SockJS from 'sockjs-client';
import { StorageProvider } from '../storage/storage';
import { WEBSOCKET_URL } from '../../config';
import { Events } from 'ionic-angular';
import { EVENT_NAMES } from '../event/event';

@Injectable()
export class WebsocketProvider {

  stompClient;

  constructor(
    public storage: StorageProvider,
    public events: Events
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
    this.connect(`${WEBSOCKET_URL}/endpointLglms`, () => {
      if(!this.storage.me) {return;}
      // 同意关注
      this.subscribe(
        `/agreeAttention/notifications/${this.storage.me.userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            this.events.publish(EVENT_NAMES.AGREE_ATTENTION);
          }
        }
      );
      // 取消关注
      this.subscribe(
        `/cancelAttention/notifications/${this.storage.me.userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            this.events.publish(EVENT_NAMES.CANCEL_ATTENTION);
          }
        }
      );
      // 新的关注
      this.subscribe(
        `/attention/notifications/${this.storage.me.userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            this.storage.newAttention = 'Y';
          }
        }
      );
      // 干部动态-关注
      this.subscribe(
        `/attentionDynamicMessage/notifications/${this.storage.me.userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            this.storage.newDynamicAttention = 'Y';
          }
        }
      );
      // 干部动态-本单位
      this.subscribe(
        `/unitDynamicMessage/notifications/${this.storage.me.userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            this.storage.newDynamicUnit = 'Y';
          }
        }
      );
      // 干部动态-领导批赞-单位领导
      this.subscribe(
        `/leaderLikeDynamicMessage/notifications/unitId/${this.storage.me.orgCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            this.storage.newDynamicLeader = 'Y';
          }
        }
      );
      // 干部动态-领导批赞-市领导
      this.subscribe(
        `/leaderLikeDynamicMessage/notifications/all`,
        (frame) => {
          if(frame.body == 'Y') {
            this.storage.newDynamicLeader = 'Y';
          }
        }
      );
      // 干部动态屏蔽/取消屏蔽
      this.subscribe(
        `/illegalDynamicMsg/notifications/${this.storage.me.userCode}`,
        (frame) => {
          const obj = JSON.parse(frame.body);
          this.events.publish(obj.isBlock ? 'block-true' : 'block-false', obj);
        }
      );
    }, () => {
      setTimeout(() => {
        this.connectWebsocket();
      }, 5000);
    });
  }

}
