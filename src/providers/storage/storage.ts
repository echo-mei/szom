import { Injectable } from '@angular/core';
import { tokenKey } from '@angular/core/src/view';

@Injectable()
export class StorageProvider {

  constructor() {
  }
  set(key, value) {
    return localStorage.setItem(key, value);
  }
  get(key) {
    return localStorage.getItem(key);
  }
  remove(...args) {
    args.forEach((arg) => {
      localStorage.removeItem(arg);
    });
  }
  clear() {
    localStorage.clear();
  }

  // token
  get token() {
    return this.get('token');
  }
  set token(value) {
    if(value==null) {
      this.remove('token');
    }else {
      this.set('token', value);
    }
  }
  // me
  get me() {
    return this.get('me') ? JSON.parse(this.get('me')) : null;
  }
  set me(value) {
    if(value==null) {
      this.remove('me');
    }else {
      this.set('me', JSON.stringify(value));
    }
  }
  // lastLoginUserCode
  get lastLoginUserCode() {
    return this.get('lastLoginUserCode');
  }
  set lastLoginUserCode(value) {
    if(value==null) {
      this.remove('lastLoginUserCode');
    }else {
      this.set('lastLoginUserCode', value);
    }
  }
  // menuList
  get menuList() {
    return JSON.parse(this.get('menuList'));
  }
  set menuList(value: any) {
    if(value==null) {
      this.remove('menuList');
    }else {
      this.set('menuList', JSON.stringify(value));
    }
  }
  // newAttention
  get newAttention() {
    return this.get('newAttention');
  }
  set newAttention(value) {
    if(value==null) {
      this.remove('newAttention');
    }else {
      this.set('newAttention', value);
    }
  }
  // newDynamicAttention
  get newDynamicAttention() {
    return this.get('newDynamicAttention');
  }
  set newDynamicAttention(value) {
    if(value==null) {
      this.remove('newDynamicAttention');
    }else {
      this.set('newDynamicAttention', value);
    }
  }
  // newDynamicUnit
  get newDynamicUnit() {
    return this.get('newDynamicUnit');
  }
  set newDynamicUnit(value) {
    if(value==null) {
      this.remove('newDynamicUnit');
    }else {
      this.set('newDynamicUnit', value);
    }
  }
  // newDynamicLeader
  get newDynamicLeader() {
    return this.get('newDynamicLeader');
  }
  set newDynamicLeader(value) {
    if(value==null) {
      this.remove('newDynamicLeader');
    }else {
      this.set('newDynamicLeader', value);
    }
  }

  // 是否有新的动态
  hasNewDynamic() {
    return this.newDynamicAttention || this.newDynamicLeader || this.newDynamicUnit ? true : false;
  }
  // 登出时重置
  resetStorage() {
    const lastLoginUserCode = this.lastLoginUserCode;
    this.clear();
    this.lastLoginUserCode = lastLoginUserCode;
  }

}
