import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';


@Injectable()
export class DailyProvider {

  constructor(public http: HttpProvider) {
  }

  // 获取工作日志列表
  getLogDailyList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logDaily`, params);
  }

  // 获取获赞情况
  getfindSTLike(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logDaily/findLikeCount`, params);
  }

  // 创建日志
  createDaily(params, files?): Observable<any> {
    return this.http.upload(`${BASE_URL}/logDaily`, params, files);
  }

  // 获取日志
  getDaily(dialyId): Observable<any> {
    return this.http.get(`${BASE_URL}/logDaily/${dialyId}`);
  }

  // 修改日志
  updateDaily(dailyId, params): Observable<any> {
    return this.http.put(`${BASE_URL}/logDaily/${dailyId}`, params);
  }

  // 删除日志
  deleteDaily(dialyId): Observable<any> {
    return this.http.delete(`${BASE_URL}/logDaily/${dialyId}`);
  }

  // 获取日志点赞列表
  getLikeList(dialyId): Observable<any> {
    // TODO: 获取单条日志的点赞列表
    return null;
  }

  // 获取日志评论列表
  getCommentList(dialyId): Observable<any> {
    // TODO: 获取单条日志的评论列表
    return null;
  }

  commentDaily(params): Observable<any> {
    return this.http.post(`${BASE_URL}/dynamicbiz/createStCommentBiz`, params);
  }

  likeDaily(params): Observable<any> {
    return this.http.post(`${BASE_URL}/dynamicbiz/createStLikeBiz`, params);
  }

  cancelLikeDaily(params): Observable<any> {
    return this.http.delete(`${BASE_URL}/dynamicbiz/deleteStLikeBiz`,params);
  }

  // 查询每周一励列表
  getDailyOneList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logWeekly`, params);
  }

  // 获取每周一励
  getDailyOne(weeklyId): Observable<any> {
    return this.http.get(`${BASE_URL}/logWeekly/${weeklyId}`);
  }

  // 修改每周一励
  updateDailyOne(weeklyId, params): Observable<any> {
    return this.http.put(`${BASE_URL}/logWeekly/${weeklyId}`, params);
  }

  // 创建每周一励
  createDailyOne(logWeekly, files?): Observable<any> {
    return this.http.upload(`${BASE_URL}/logWeekly`, logWeekly, files);
  }

  // 删除每周一励
  deleteDailyOne(weeklyId): Observable<any> {
    return this.http.delete(`${BASE_URL}/logWeekly/${weeklyId}`);
  }

  //查询每季三励列表
  getDailyThreeList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logQuarterly`,params);
  }

  // 获取每季三励
  getDailyThree(id): Observable<any> {
    return this.http.get(`${BASE_URL}/logQuarterly/${id}`);
  }

  // 修改每季三励
  updateDailyThree(id, quarterly): Observable<any> {
    return this.http.put(`${BASE_URL}/logQuarterly/${id}`, quarterly);
  }

  // 创建每季三励
  createDailyThree(quarterly, files?): Observable<any> {
    return this.http.upload(`${BASE_URL}/logQuarterly`, quarterly, files);
  }

  // 删除每季三励
  deleteDailyThree(id): Observable<any> {
    return this.http.delete(`${BASE_URL}/logQuarterly/${id}`);
  }

  //查询每年十励列表
  getDailyTenList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logYearly`,params);
  }

  // 获取每年十励
  getDailyTen(id): Observable<any> {
    return this.http.get(`${BASE_URL}/logYearly/${id}`);
  }

  // 修改每年十励
  updateDailyTen(id, logYearly): Observable<any> {
    return this.http.put(`${BASE_URL}/logYearly/${id}`, logYearly);
  }

  // 创建每年十励
  createDailyTen(logYearly, files?): Observable<any> {
    return this.http.upload(`${BASE_URL}/logYearly`, logYearly, files);
  }

  // 删除每年十励
  deleteDailyTen(id): Observable<any> {
    return this.http.delete(`${BASE_URL}/logYearly/${id}`);
  }

  // 获取干部动态
  getDynamic(userId): Observable<any> {
    return this.http.get(`${BASE_URL}/getDynamic/${userId}`)
  }

}
