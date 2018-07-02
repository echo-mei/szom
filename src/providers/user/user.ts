import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';
import { Observable } from 'rxjs';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class UserProvider {

  constructor(
    public http: HttpProvider,
    public storage: StorageProvider
  ) {
  }

  // 登陆
  login(params): Observable<any> {
    return this.http.post(`${BASE_URL}/base/login`, params);
  }

  // 短信验证码登陆
  sendSMSCode(params): Observable<any> {
    return this.http.post(`${BASE_URL}/base/sendSMSCode`, params);
  }

  // 获取验证码
  getSMSCode(userCode): Observable<any> {
    return this.http.get(`${BASE_URL}/base/getSMSCode`, {
      userCode: userCode
    });
  }

  // 获取我的个人信息
  getMe(): Observable<any> {
    return this.http.get(`${BASE_URL}/personInfo`, {userCode: JSON.parse(this.storage.get('user')).userCode});
  }

  // 获取我的自述信息
  getMySelfInfo(): Observable<any> {
    let personId = JSON.parse(this.storage.get('user')).personId;
    return this.http.get(`${BASE_URL}/personalStatement/${personId}`);
  }

  // 修改我的自述信息
  saveMySelfInfo(selfInfo): Observable<any> {
    return this.http.post(`${BASE_URL}/personalStatement`, selfInfo);
  }

  // 获取我的印象标签列表
  getImpressionList(): Observable<any> {
    // TODO: 获取我的印象标签列表
    return null;
  }

  // 帮助与反馈-获取常见问题列表
  getAnswerList(): Observable<any> {
    // TODO: 帮助与反馈-获取常见问题列表
    return null;
  }

  // 账户安全-修改手机号
  updatePhone(): Observable<any> {
    // TODO: 账户安全-修改手机号
    return null;
  }

  // 退出
  logout(): Observable<any> {
    // TODO: 退出
    return null;
  }

  // 获取某天的签到信息
  getOneDaySign(): Observable<any> {
    // TODO: 获取某天的签到信息
    return null;
  }

  // 获取签到标签列表
  getSignList(): Observable<any> {
    // TODO: 获取签到标签列表
    return null;
  }

  // 获取某月的签到信息列表
  getOneMonthSignList(): Observable<any> {
    // TODO: 获取某月的签到信息列表
    return null;
  }

  // 签到
  sign(): Observable<any> {
    // 签到
    return null;
  }

  // 获取用户信息
  getUser(): Observable<any> {
    // TODO: 获取用户信息
    return null;
  }

  // 获取新的关注数
  getNewFollowCount(): Observable<any> {
    // TODO: 获取新的关注数
    return null;
  }

  // 获取新的关注列表
  getNewFollowList(): Observable<any> {
    // TODO: 获取新的关注列表
    return null;
  }

  // 申请关注
  postFollow(): Observable<any> {
    // TODO: 申请关注
    return null;
  }

  // 接受关注
  recieveFollow(): Observable<any> {
    // TODO: 接受关注
    return null;
  }

  // 拒绝关注
  refuseFollow(): Observable<any> {
    // TODO: 拒绝关注
    return null;
  }

  // 获取本单位下级单位列表
  getUnitList(): Observable<any> {
    // TODO: 获取本单位下级单位列表
    return null;
  }

  // 获取单位下人员列表
  getUnitPersonList(): Observable<any> {
    // TODO: 获取单位下人员列表
    return null;
  }

  // 获取其他组织下级列表
  getOrgList(): Observable<any> {
    // TODO: 获取其他组织下级列表
    return null;
  }

  // 获取其他组织下人员列表
  getOrgPersonList(): Observable<any> {
    // TODO: 获取其他组织下人员列表
    return null;
  }

  // 获取已关注分组
  getFollowGroup(): Observable<any> {
    // TODO: 获取已关注分组
    return null;
  }

  // 获取已关注分组用户列表
  getFollowUserList(): Observable<any> {
    // TODO: 获取已关注分组用户列表
    return null;
  }

}
