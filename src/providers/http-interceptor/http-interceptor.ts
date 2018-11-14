import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpHeaders, HttpEventType, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, TimeoutError } from 'rxjs';
import { ToastController, LoadingController, App, Events } from 'ionic-angular';
import { StorageProvider } from '../storage/storage';
import { LoginPage } from '../../pages/login/login';
import { ErrorPage } from '../../pages/error/error';

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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders;
    if(this.storage.token) {
      headers = req.headers.set('Authorization', this.storage.token);
    }
    const appReq = req.clone({
      headers: headers
    });
    let loading = this.loadingCtrl.create({
      content: '处理中...'
    });
    // appReq.method!='GET' && loading.present();
    return next
      .handle(appReq).timeout(30000)
      .mergeMap((event: any) => {
        switch(event.type) {
          case HttpEventType.Sent:
            // console.log(`${appReq.url}请求已发出`);
            break;
          case HttpEventType.UploadProgress:
            // console.log(`${appReq.url}收到上传进度事件`);
            break;
          case HttpEventType.ResponseHeader:
            // console.log(`${appReq.url}收到响应状态码和响应头`);
            break;
          case HttpEventType.DownloadProgress:
            // console.log(`${appReq.url}收到下载进度事件`);
            break;
          case HttpEventType.Response:
            // console.log(`${appReq.url}收到响应对象`);
            loading.dismiss();
            if(!event.body.success) {
              return Observable.create(observer => observer.error(event));
            }
            break;
          case HttpEventType.User:
            // console.log(`${appReq.url}收到自定义事件`);
            break;
          default:
            break;
        }
        return Observable.create(observer => observer.next(event));
      })
      .catch((res: any) => {//捕获异常
        loading.dismiss();
        if(!navigator.onLine) { // 断网异常
          this.app.getRootNav().setRoot(ErrorPage);
          return Observable.throw(res);
        }
        let message = '';
        switch (res.status) {
          case 200:
            // TODO: 处理业务逻辑
            message = res.body.msg;
            break;
          case 401:
            // TODO: 无权限处理
            this.app.getRootNav().setRoot(LoginPage);
            setTimeout(() => {
              this.storage.resetStorage();
            }, 500);
            message = res.error ? res.error.message : res.message;
            break;
          case 404:
            // TODO: 404 处理
            message = res.error ? res.error.message : res.message;
            break;
          case 500:
            // TODO: 500 处理
            message = res.error ? res.error.message : res.message;
            break;
          default:
            // 其他错误
            message = res.error ? res.error.message : res.message;
            if(res instanceof TimeoutError) {
              message = '请求超时';
            }
            break;
        }
        let toast = this.toastCtrl.create({
          cssClass: 'mini',
          message: message,
          position: 'middle',
          duration: 2000
        });
        toast.present();
        // 以错误的形式结束本次请求
        return Observable.throw(res);
      });
  }

}
