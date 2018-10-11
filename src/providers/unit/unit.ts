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

  // 查询其他单位下的所有子集机构
  getOtherUnitOrgsList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/otherUnit/orgs`, params);
  }

  // 查询其他本单位及下属机构的所有人员
  getOtherUnitUsersList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/otherUnit/users`, params);
  }

  // 查询单位下的所有子集机构
  getOwnUnitOrgssList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/ownUnit/childOrgs`, params);
  }

  // 查询本单位及下属机构的所有人员
  getOwnUnitUsersList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/ownUnit/users`, params);
  }

  // 查询有权限的机构列表
  getAllUnitOrgsList(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/contactList/allUnit/orgs`, params);
  }
}
