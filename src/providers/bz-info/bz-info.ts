import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { Observable } from 'rxjs';
import { StorageProvider } from '../storage/storage';
import { BASE_URL } from '../../config';
import { Base64 } from '@ionic-native/base64';


@Injectable()
export class BzInfoProvider {

  constructor(
    public http: HttpProvider,
    public storage: StorageProvider
  ) {
  }

  // 班子信息
  // 获取班子信息
  getBzInfo(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/findByUserCode`,params);
  }
  // 获取班子成员
  getBzInfoMember(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/findTeamMember`,params)
  }
  // 班子职数
  getBzZhiShu(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/getLeaderDuty`, params);
  }
  // 班子分工
  getBzFengong(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/getTeamMember`, params);
  }
  // 修改班子描述
  updateBzDesc(params): Observable<any>{
    return this.http.put(`${BASE_URL}/ubLeaderTeam/updateTeam`, params);
  }

  // 增加成员时获取成员部分（包括单位与人）
  getUnitPeople(params) {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/findUserListForAdd`, params)
  }

  // 增加班子成员
  addBzMember(params): Observable<any>{
    return this.http.put(`${BASE_URL}/ubLeaderTeam/addTeamMember`, params);
  }
  // 添加班子成员获取单位
  getChildOrgList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/findOrgListForAdd`, params);
  }
  // 删除班子成员
  delBzMember(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/deleteTeamMember`, params);
  }
  // 修改成员分工
  updateDivision(params): Observable<any>{
    return this.http.put(`${BASE_URL}/ubLeaderTeam/updateTeamMemberDivision`, params);
  }

  // 添加 成员搜索
  addSearchMember(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/findUserListForAdd`, params);
  }
  // 添加 单位搜索
  unitSearchMember(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubLeaderTeam/findOrgListForAdd`, params);
  }
  // 班子排序
  bzSort(params): Observable<any>{
    return this.http.put(`${BASE_URL}/ubLeaderTeam/updateOrderNo`, params);
  }

  // 班子编制
  getBzWeave(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubHc`, params)
  }
  // 新建编制
  addBzWeave(params): Observable<any> {
    return this.http.post(`${BASE_URL}/ubHc/createHcInfo`, params);
  }
  // 获取指定编制信息
  getOneWeave(params): Observable<any> {
    return this.http.get(`${BASE_URL}/ubHc/getHcInfo`, params);
  }
  // 更新编制信息
  updateWeave(params): Observable<any>{
    return this.http.put(`${BASE_URL}/ubHc/updateHcInfo`, params);
  }
  // 删除指定编制信息
  delWeave(params): Observable<any>{
    return this.http.delete(`${BASE_URL}/ubHc/deleteHcInfo`, params);
  }


  // 班子职数
  getBzPositionList(params) {
    return this.http.get(`${BASE_URL}/ubLeader`, params)
  }
  // 新建职数信息
  addBzPosition(params): Observable<any> {
    return this.http.post(`${BASE_URL}/ubLeader/createUbLeaderInfo`, params);
  }
  // 修改指定职数信息
  updatePosition(params): Observable<any>{
    return this.http.put(`${BASE_URL}/ubLeader/updateUbLeaderInfo`, params);
  }
  // 删除指定职数信息
  delPosition(params): Observable<any>{
    return this.http.delete(`${BASE_URL}/ubLeader/deleteUbLeaderInfo`, params);
  }

}
