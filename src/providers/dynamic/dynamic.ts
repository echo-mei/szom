
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';

@Injectable()
export class DynamicProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello DynamicProvider Provider');
  }

  // 获取关注动态信息列表
  getAttentionDynamicList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/sbDynamic/listAttentionDynamicMessage`, params);
  }

  // 获取单位动态信息列表
  getUnityDnamicList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/sbDynamic/listUnitDynamicMessage`, params);
  }

  // 获取推荐动态信息列表
  getRecommendDynamicList(): Observable<any> {
    return this.http.get(`${BASE_URL}/sbDynamic/listRecommendDynamicMessage`);
  }

  // 获取领导批赞动态信息列表
  getLeaderLikeDynamicList(params): Observable<any> {
    return this.http.get(`${BASE_URL}/sbDynamic/listLeaderLikeDynamicMessage`, params);
  }

  // 获取动态信息详情
  getDynamicDetail(params): Observable<any> {
    return this.http.get(`${BASE_URL}/sbDynamic/getSbDynamicView`, params);
  }

  // 评论动态
  commentDaily(params): Observable<any> {
    return this.http.post(`${BASE_URL}/dynamicbiz/createStComment`, params);
  }

  // 点赞动态
  likeDaily(params): Observable<any> {
    return this.http.post(`${BASE_URL}/dynamicbiz/createStLike`,params);
  }


}
