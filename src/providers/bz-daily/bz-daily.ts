import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config';
import { HttpProvider } from '../http/http';

/*
  Generated class for the BzDailyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BzDailyProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello BzDailyProvider Provider');
  }

  // 获取工作日志列表
  getLogDailyList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logDailyTeam`, params);
  }

  // 获取获赞情况
  getfindSTLike(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logDailyTeam/findTeamLikeCount`, params);
  }

  // 创建日志
  createDaily(params, files?): Observable<any> {
    return this.http.upload(`${BASE_URL}/logDailyTeam`, params, files);
  }

  // 获取日志
  getDaily(dailyTeamId): Observable<any> {
    return this.http.get(`${BASE_URL}//logDailyTeam/${dailyTeamId}`);
  }

  // 删除日志
  deleteDaily(dailyTeamId): Observable<any> {
    return this.http.delete(`${BASE_URL}/logDailyTeam/${dailyTeamId}`);
  }

  commentDaily(params): Observable<any> {
    return this.http.post(`${BASE_URL}/dynamicbiz/createStCommentBiz`, params);
  }

  likeDaily(params): Observable<any> {
    return this.http.post(`${BASE_URL}/dynamicbiz/createStLikeBiz`,params);
  }

}
