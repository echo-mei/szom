import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ToastController, LoadingController } from 'ionic-angular';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: StorageProvider
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let headers: HttpHeaders;
    if(this.storage.get('token')) {
      headers = req.headers.set('Authorization', this.storage.get('token'));
    }
    const appReq = req.clone({
      headers: headers
    });
    let loading = this.loadingCtrl.create({
      content: ''
    });
    appReq.method!='GET' && loading.present();
    return next
      .handle(appReq)
      .mergeMap((event: any, index: any) => {
        if (event instanceof HttpResponse) { //只有当请求成功时，才会返回HttpResponse
          loading.dismiss();
          if(!event.body.success) {
            return Observable.create(observer => observer.error(event));//主动抛出状态码为200的业务逻辑异常
          }
        }
        return Observable.create(observer => observer.next(event));
      })
      .catch((res: HttpResponse<any>) => {//捕获异常
        let message = '';
        switch (res.status) {
            case 200:
                // TODO: 处理业务逻辑
                message = res.body.msg;
                break;
            case 401:
                // TODO: 无权限处理
                message = '用户无权限';
                loading.dismiss();
                break;
            case 404:
                // TODO: 404 处理
                message = '资源未找到';
                loading.dismiss();
                break;
            case 500:
                // TODO: 500 处理
                message = '服务器异常';
                loading.dismiss();
                break;
            default:
                // 其他错误
                message = '异常';
                loading.dismiss();
                break;
        }
        let toast = this.toastCtrl.create({
          cssClass: 'http-error',
          message: message,
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
        // 以错误的形式结束本次请求
        return Observable.throw(res);
      });
  }

}
