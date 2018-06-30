import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';

@Injectable()
export class SignProvider {

  constructor(
    public http: HttpProvider
  ) {
  }

  // 统计当月签到类型签到次数
  signInCount(year, month) {
    return this.http.get(`${BASE_URL}/signIn/count`, {
      year: year,
      month: month
    });
  }

  // 签到
  signIn(sign) {
    return this.http.post(`${BASE_URL}/signIn`, sign);
  }

  // 获取当月签到列表
  signInList(params) {
    return this.http.get(`${BASE_URL}/signIn`, params);
  }

}
