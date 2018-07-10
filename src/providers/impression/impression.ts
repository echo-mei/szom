import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config';

@Injectable()
export class ImpressionProvider {

  constructor(
    public http: HttpProvider
  ) {

  }

  // 查看(统计)用户的印象标签(统计数量)
  statistics(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/impressionTag/statistics`, params);
  }

  // 查看本人对用户创建的标签
  allTags(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/impressionTag/allTags`, params);
  }

  // 更新用户的印象标签
  update(params): Observable<any> {
    return this.http.put(`${BASE_URL}/impressionTag`, params);
  }

  // 添加自定义标签
  add(params): Observable<any> {
    return this.http.post(`${BASE_URL}/impressionTag/tagDef`, params);
  }

}
