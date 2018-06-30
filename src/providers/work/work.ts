import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

@Injectable()
export class WorkProvider {

  constructor(public http: HttpProvider) {
  }

  // 工作周表列表
  public workList(params) {
    // 获取工作周表列表
    return null;
  }

  // 创建工作
  public createWork(params) {
    // 创建工作
    return null;
  }

  // 修改工作
  public updateWork(params) {
    // 修改工作
    return null;
  }

  // 获取工作
  public getWork(params) {
    // 获取工作
    return null;
  }

  // 删除工作
  public deleteWork(params) {
    // 删除工作
    return null;
  }

}
