import { HttpProvider } from '../http/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config';

/*
  Generated class for the BzInfoLibProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BzInfoLibProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello BzInfoLibProvider Provider');
  }

  //查询权限内的班子列表
  getBzInfoLibList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/leaderTeamBank/goTeamInfoBank`,params);
  }

  // 根据班子Id查询班子信息
  getBzTeamInfo(params): Observable<any> {
    return this.http.get(`${BASE_URL}/leaderTeamBank/findByTeamId`,params);
  }

}
