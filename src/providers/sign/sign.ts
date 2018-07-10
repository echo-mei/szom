import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';

@Injectable()
export class SignProvider {

  constructor(
    public http: HttpProvider
  ) {
  }

  // 获取所有签到类型
  signInTypeList() {
    return this.http.get(`${BASE_URL}/signIn/signInType`);
  }

  // 统计签到类型签到次数
  signInCount(params) {
    return this.http.get(`${BASE_URL}/signIn/statistics`, params);
  }

  // 获取今天签到信息
  getTodaySign(params) {
    return this.http.get(`${BASE_URL}/signIn/getTodaySignIn`, params);
  }

  // 签到
  signIn(sign) {
    return this.http.put(`${BASE_URL}/signIn`, sign);
  }

  // 获取当月签到列表
  signInList(params) {
    return this.http.get(`${BASE_URL}/signIn`, params);
  }

}
