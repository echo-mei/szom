import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config';

@Injectable()
export class UnitProvider {

  constructor(public http: HttpProvider) {
  }

  // 查询所有组织机构
  getOrgList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/organization`, params);
  }

  // 查询其他组织/本单位下的机构列表
  getChildOrgList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/org/childOrg`, params);
  }

  // 查询单位|机构下的人员列表
  getOrgPersonList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/org/users`, params);
  }

  // 查询其他组织列表
  getOtherUnitList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/otherUnit`, params);
  }

}
