import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';
import { Observable } from 'rxjs';

@Injectable()
export class EvaluateProvider {

  constructor(public http: HttpProvider) {
  }

  // 干部评价列表
  getEvaluateList(): Observable<any> {
    return this.http.get(`${BASE_URL}/personalEvaluation`);
  }

  // 获取评价
  getEvalute(): Observable<any> {
    // TODO: 获取评价
    return null;
  }

  // 创建干部评价
  createEvalute(params): Observable<any>{
    return this.http.post(`${BASE_URL}/personalEvaluation`,params);
  }

  // 修改干部评价
  updateEvalute(params): Observable<any>{
    return this.http.put(`${BASE_URL}/personalEvaluation`,params);
  }

  // 删除干部评价
  deleteEvalute(evaluationId): Observable<any>{
    return this.http.delete(`${BASE_URL}/personalEvaluation/${evaluationId}`);
  }

}
