import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';

@Injectable()
export class WorkProvider {

  constructor(public http: HttpProvider) {
  }

  // 获取工作周表列表
  public getWeektableList(params) {
    return this.http.get(`${BASE_URL}/upWeektable`, params);
  }

  // 创建工作周表
  public createWeektable(params) {
    return this.http.post(`${BASE_URL}/upWeektable`, params);
  }

  // 修改工作周表
  public updateWeektable(weektableId,params) {
    return this.http.put(`${BASE_URL}/upWeektable/${weektableId}`, params);
  }

  // 获取工作周表信息
  public getWork(weektableId) {
    return this.http.get(`${BASE_URL}/upWeektable/${weektableId}`);
  }

  // 删除工作周表
  public deleteWeektable(weektableId) {
    return this.http.delete(`${BASE_URL}/upWeektable/${weektableId}`);
  }

  //统计工作周表类型数量
  public countWeektable(params) {
    return this.http.get(`${BASE_URL}/upWeektable/countWeektableType`, params);
  }

  //创建自定义工作周表类型
  public createWeektableType(params) {
    return this.http.post(`${BASE_URL}/upWeektable/createUpWeektableType`, params);
  }

  //获取工作周表类型列表
  public getWeektableType() {
    return this.http.get(`${BASE_URL}/upWeektable/findUpWeektableType`);
  }

}
