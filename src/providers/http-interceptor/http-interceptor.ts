import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ToastController, LoadingController, App, Events } from 'ionic-angular';
import { StorageProvider } from '../storage/storage';
import { LoginPage } from '../../pages/login/login';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: StorageProvider,
    public app: App,
    public events: Events
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
      content: '处理中...'
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
                this.storage.remove('user', 'menuList', 'token');
                this.events.publish('logout');
                message = res['error'] ? res['error'].message : res['message'];
                loading.dismiss();
                this.app.getRootNav().setRoot(LoginPage);
                break;
            case 404:
                // TODO: 404 处理
                message = res['error'] ? res['error'].message : res['message'];
                loading.dismiss();
                break;
            case 500:
                // TODO: 500 处理
                message = res['error'] ? res['error'].message : res['message'];
                loading.dismiss();
                break;
            default:
                // 其他错误
                message = res['error'] ? res['error'].message : res['message'];
                loading.dismiss();
                break;
        }
        let toast = this.toastCtrl.create({
          cssClass: 'mini',
          message: message,
          position: 'bottom',
          duration: 2000
        });
        toast.present();
        // 以错误的形式结束本次请求
        return Observable.throw(res);
      });
  }

}
