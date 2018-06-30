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

  listCount(params): Observable<any> {
    return this.http.get(`${BASE_URL}/impressionTag/count`, params);
  }

}
