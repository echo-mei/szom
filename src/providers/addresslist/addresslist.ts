// import { HttpClient } from '@angular/common/http';
//关闭默认的http请求。使用自定义http请求返回的数据格式。
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

import { Observable } from 'rxjs';
import { BASE_URL,REAL_URL} from '../../config';

/*
  Generated class for the AddresslistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddresslistProvider {

  constructor(public http: HttpProvider) {
  }

  getFriendsList(userId): Observable<any> {
    return this.http.get(`${BASE_URL}/getFriendsList/${userId}`);
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
}
