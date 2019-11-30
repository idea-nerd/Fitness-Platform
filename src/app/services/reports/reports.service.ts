import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  endPoint: string = '/api/reports';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  readRevenue() {
      return this.http.get<any[]>(this.url + '/revenue', {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readClients() {
    return this.http.get<any[]>(this.url + '/clients', {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  readSubscriptions() {
    return this.http.get<any[]>(this.url + '/subscriptions', {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

}
