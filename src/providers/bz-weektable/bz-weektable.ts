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

  updateWeektable(id, params?): Observable<any> {
    return this.http.put(`${BASE_URL}/teamUpWeektable/${id}`, params);
  }

  listWeektable(params?): Observable<any> {
    return this.http.get(`${BASE_URL}/teamUpWeektable`, params);
  }

  staticWeektable(params): Observable<any> {
    return this.http.get(`${BASE_URL}/teamUpWeektable/countWeektableType`, params);
  }

  getWorktable(id): Observable<any> {
    return this.http.get(`${BASE_URL}/teamUpWeektable/${id}`);
  }

  deleteWeektable(id): Observable<any> {
    return this.http.delete(`${BASE_URL}/teamUpWeektable/${id}`);
  }

}
