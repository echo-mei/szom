import { Injectable, EventEmitter } from '@angular/core';
import { HttpProvider } from '../http/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config';

/*
  Generated class for the HeavyFocusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HeavyFocusProvider {

  constructor(public http: HttpProvider) {
  }

  // 申请重点关注
  postAttentedFollow(params): Observable<any> {
    return this.http.post(`${BASE_URL}/empAttention/addEmpAttentionRelation`, params);
  }

  //查询当前用户的重点关注用户列表
  getHeavyFocusPersonList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/empAttention/findEmpAttentionRelationList`, params);
  }

  //模糊查询用户可以重点关注的人员所在单位列表
  getUnHeavyFocusUnitList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/empAttention/add/findUnitList`, params);
  }

  //模糊查询用户可以重点关注的人员列表
  getUnHeavyFocusPersonList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/empAttention/add/findPersonList`, params);
  }

}
