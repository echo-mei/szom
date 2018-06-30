import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { File, FileEntry } from '@ionic-native/file';

import { Observable } from 'rxjs';
import { ForkJoinObservable } from "rxjs/observable/ForkJoinObservable";

@Injectable()
export class HttpProvider {

  constructor(
    public http: HttpClient,
    private file: File
  ) {
  }

  post(url, params?): Observable<any> {
    return this.http.post(url, params).mergeMap(
      (data:any) => {
        return Observable.create(observable => observable.next(data ? data.obj : data));
      }
    );
  }

  get(url, params?): Observable<any> {
    return this.http.get(url, {params: params}).mergeMap(
      (data:any) => {
        return Observable.create(observable => observable.next(data ? data.obj : data));
      }
    );
  }

  put(url, params): Observable<any> {
    return this.http.put(url, params).mergeMap(
      (data:any) => {
        return Observable.create(observable => observable.next(data ? data.obj : data));
      }
    );
  }

  delete(url, params?): Observable<any> {
    return this.http.delete(url, {params:params}).mergeMap(
      (data:any) => {
        return Observable.create(observable => observable.next(data ? data.obj : data));
      }
    );
  }

  upload(url: string, params?: any, files?: Array<{name, path}>) {
    let formData = new FormData();
    for(let key in params) {
      formData.append(key, params[key]);
    }
    let observables: Array<any> = [];
    files&&files.forEach((value) => {
      if (!value.path.startsWith('file://')) {
        value.path = 'file://' + value.path;
      }
      let observable = new Observable((sub) => {
        this.file.resolveLocalFilesystemUrl(value.path).then(entry => {
          (entry as FileEntry).file(file => {
            let blob: Blob = <Blob>file;
            const reader = new FileReader();
            reader.onloadend = () => {
              const imgBlob = new Blob([reader.result], {type: blob.type});
              formData.append(value.name, imgBlob, (<any>blob).name);
              sub.next(null);
              sub.complete();
            };
            reader.readAsArrayBuffer(blob);
          });
        });
      });
      observables.push(observable);
    });
    if(observables.length) {
      return ForkJoinObservable.create(observables).mergeMap(data => {
        let ob = this.http.post(url, formData);
        return ob.mergeMap((data: any) => {
          return Observable.create(observable => observable.next(data? data.obj : data));
        });
      });
    }else {
      let ob = this.http.post(url, formData);
      return ob.mergeMap((data: any) => {
        return Observable.create(observable => observable.next(data? data.obj : data));
      });
    }

  }

}
