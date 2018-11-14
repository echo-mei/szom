import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';
import { Observable } from 'rxjs';
import { StorageProvider } from '../storage/storage';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@Injectable()
export class UserProvider {

  constructor(
    public http: HttpProvider,
    public storage: StorageProvider
  ) {
  }

  // 获取登陆密钥
  getRSAPublicKey(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/base/getRSAPublicKey`, params);
  }

  // 登录
  login(params): Observable<any> {
    return this.http.post(`${BASE_URL}/base/login`, params);
  }

  // 获取我的信息
  getMe(): Observable<any> {
    return this.http.get(`${BASE_URL}/personInfo/getMinePersonInfo`);
    // return this.getUserInfo({userCode: this.storage.me.userCode});
  }

  // 获取手机号
  getMobilePhone(): Observable<any> {
    return this.http.get(`${BASE_URL}/personInfo/getMinePhoneNum`)
  }

  // 短信验证码登录
  sendSMSCode(params): Observable<any> {
    return this.http.post(`${BASE_URL}/base/sendSMSCode`, params);
  }

  // 获取验证码
  getSMSCode(params): Observable<any> {
    return this.http.get(`${BASE_URL}/base/getLoginSMSCode`, params);
  }

  // 获取修改手机号短信验证码
  getNewMobliePhoneSMSCode(params): Observable<any> {
    return this.http.get(`${BASE_URL}/userSMS/getNewMobliePhoneSMSCode`, params)
  }
  // 账户安全-获取手机号短信验证码
  getMobliePhoneSMSCode(params): Observable<any> {
    return this.http.get(`${BASE_URL}/userSMS/getMobliePhoneSMSCode`, params);
  }

  // 验证短信验证码
  checkUserSMS(params): Observable<any> {
    return this.http.get(`${BASE_URL}/userSMS/checkUserSMS`, params);
  }

  // 账户安全-验证用户名和密码
  validatorAccount(params): Observable<any>{
    return this.http.post(`${BASE_URL}/userSMS/checkUserAccount`, params);
  }
  // 账户安全-验证手机号和短信验证码
  validatorPhont(params): Observable<any> {
    return this.http.post(`${BASE_URL}/userSMS/checkUserAccountBySMS`, params)
  }

  // 获取用户个人信息
  getUserInfo(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/personInfo`, params);
  }

  // 获取个人头像地址
  getHeadImageUrl(personId) {
    return `${BASE_URL}/personInfo/getPhoto?Authorization=${this.storage.token}&personId=${personId}`;
  }

  // 获取用户个人信息
  getUserInfoByPersonId(personId): Observable<any> {
    return this.http.get(`${BASE_URL}/personInfo/${personId}`);
  }

  // 获取用户列表
  getPersonList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/personInfo/findPersonByCondition`, params);
  }

  // 获取用户自述信息
  getUserSelfInfo(personId, params?): Observable<any> {
    return this.http.get(`${BASE_URL}/personalStatement/${personId}`, params);
  }

  // 修改我的自述信息
  saveMySelfInfo(selfInfo): Observable<any> {
    return this.http.post(`${BASE_URL}/personalStatement`, selfInfo);
  }

  // 账户安全-修改手机号
  updatePhone(params): Observable<any> {
    // TODO: 账户安全-修改手机号
    return this.http.post(`${BASE_URL}/personInfo/updateMobilePhone`, params);
  }

  // 账户安全-修改密码
  updatePassword(params): Observable<any> {
    return this.http.post(`${BASE_URL}/users/updateUsersPassword`, params);
  }

  // 账户安全-修改用户名
  updateUsername(params): Observable<any>{
    return this.http.post(`${BASE_URL}/users/updateUserAccount`, params);
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



  // 退出
  logout(params?): Observable<any> {
    return this.http.delete(`${BASE_URL}/base/logout`, params);
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
  postFollow(params): Observable<any> {
    return this.http.post(`${BASE_URL}/contactList/stAttentionRelation`, params);
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

  // 获取当前最新版本号
  versionupdates(params): Observable<any> {
    return this.http.get(`${BASE_URL}/versionupdates`, params);
  }

}
