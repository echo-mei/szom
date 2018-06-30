import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProvider } from '../http/http';
import { BASE_URL,REAL_URL} from '../../config';


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
    return this.http.get(`${BASE_URL}/stLike/findStLikeCashByAccountCodeAndType`,params);
  }

  // 创建日志
  createDaily(params): Observable<any> {
    return this.http.post(`${BASE_URL}/logDaily`,params);
  }

  // 获取日志
  getDaily(dialyId): Observable<any> {
    return this.http.get(`${BASE_URL}/logDaily/${dialyId}`);
  }

  // 修改日志
  sendDailyList(title,content,publisher,dailyId): Observable<any> {
    return this.http.post(`${BASE_URL}/logDaily`,{
      title: title,
      content: content,
      publisher:publisher,
      dailyId:dailyId,
    });
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
    // TODO: 评论日志
    return null;
  }

  likeDaily(params): Observable<any> {
    // TODO: 点赞日志
    return null;
  }

  cancelLikeDaily(params): Observable<any> {
    // TODO: 取消点赞日志
    return null;
  }

  // 查询每周一励列表
  getDailyOneList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logWeekly`,params);
  }

  // 获取每周一励
  getDailyOne(id): Observable<any> {
    // TODO: 获取每周一励
    return null;
  }

  // 修改每周一励
  updateDailyOne(id): Observable<any> {
    // TODO: 修改每周一励
    return null;
  }

  // 创建每周一励
  createDailyOne(id): Observable<any> {
    // TODO: 创建每周一励
    return null;
  }

  // 删除每周一励
  deleteDailyOne(id): Observable<any> {
    // TODO: 删除每周一励
    return null;
  }

  //查询每季三励列表
  getDailyThreeList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logQuarterly`,params);
  }

  // 获取每季三励
  getDailyThree(id): Observable<any> {
    // TODO: 获取每季三励
    return null;
  }

  // 修改每季三励
  updateDailyThree(id): Observable<any> {
    // TODO: 修改每季三励
    return null;
  }

  // 创建每季三励
  createDailyThree(id): Observable<any> {
    // TODO: 创建每季三励
    return null;
  }

  // 删除每季三励
  deleteDailyThree(id): Observable<any> {
    // TODO: 删除每季三励
    return null;
  }

  //查询每年十励列表
  getDailyTenList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/logYearly`,params);
  }

  // 获取每年十励
  getDailyTen(id): Observable<any> {
    // TODO: 获取每年十励
    return null;
  }

  // 修改每年十励
  updateDailyTen(id): Observable<any> {
    // TODO: 修改每年十励
    return null;
  }

  // 创建每年十励
  createDailyTen(id): Observable<any> {
    // TODO: 创建每年十励
    return null;
  }

  // 删除每年十励
  deleteDailyTen(id): Observable<any> {
    // TODO: 删除每年十励
    return null;
  }

  //post请求
  doPost(apiUrl,json,callback){
    //`${REAL_URL}`请求地址'http://192.168.0.197:8803'
      var Url=REAL_URL+apiUrl;
    console.log(Url);
  }
}
