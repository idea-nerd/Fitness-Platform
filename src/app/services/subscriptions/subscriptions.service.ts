import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Subscription } from '../../models/subscriptions.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {

  endPoint: string = '/api/subscriptions';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  create(payload: Subscription) {
    return this.http.post<Subscription>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  read() {
      return this.http.get<Subscription[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelected(id: number = 0) {
      return this.http.get<Subscription[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelectedClientSubscriptions(id: number = 0) {
    return this.http.get<Subscription[]>(this.url + '/client/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  update(payload: Subscription, id: number) {
    return this.http.put<Subscription>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  archive(id: number) {
    return this.http.delete<Subscription>(this.url + '/archive/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  delete(id: number) {
    return this.http.delete<Subscription>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }
}
