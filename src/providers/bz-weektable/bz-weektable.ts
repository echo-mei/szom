import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';

@Injectable()
export class BzWeektableProvider {

  constructor(public http: HttpProvider) {
  }

  findUpWeektableType(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/teamUpWeektable/findUpWeektableType`, params);
  }

  createWeektable(params?): Observable<any> {
    return this.http.post(`${BASE_URL}/teamUpWeektable`, params);
  }

  listWeektable(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/teamUpWeektable`, params);
  }

}
