import { Injectable } from '@angular/core';

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

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  setToken(token) {
    this.set('token', token);
  }

  getToken() {
    return this.get('token');
  }

  setItem(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  }
  getItem(key){
    return JSON.parse(localStorage.getItem(key));
  }

}
