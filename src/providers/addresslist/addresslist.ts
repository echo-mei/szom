import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

import { Observable } from 'rxjs';
import { BASE_URL } from '../../config';

@Injectable()
export class AddresslistProvider {

  constructor(public http: HttpProvider) {
  }

  // 查询当前用户的关注列表
  getMyFriendsList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/sbAttentionRelation`, params);
  }

  // 获取新的关注列表
  getNewFollowUserList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/stAttentionRelation/userList`, params);
  }

  // 更新用户关注关系业务关注状态
  changeStatus(params?): Observable<any> {
    return this.http.put(`${BASE_URL}/contactList/stAttentionRelation`, params);
  }

  getTeamList(pid):Observable<any> {
    return this.http.get(`${BASE_URL}/teamlist/${pid}`)
  }

  getPersonList(uintId): Observable<any> {
    return this.http.get(`${BASE_URL}/getPersonList/${uintId}`)
  }

  getPersonInfo(uid): Observable<any> {
    return this.http.get(`${BASE_URL}/getPersonInfo/${uid}`)
  }

  hasNewStAttention(): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/stAttentionRelation/hasNewStAttention`);
  }

  updateToViewed(): Observable<any> {
    return this.http.put(`${BASE_URL}/contactList/stAttentionRelation/updateToViewed`, null);
  }
}
