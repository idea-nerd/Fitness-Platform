import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Registration, Subscription, Store } from '../../models/payments.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  registrationEndPoint: string = '/api/payments/registrations';
  registrationUrl: string = API_BASE_URL + this.registrationEndPoint;

  subscriptionEndPoint: string = '/api/payments/subscriptions';
  subscriptionUrl: string = API_BASE_URL + this.subscriptionEndPoint;

  storeEndPoint: string = '/api/payments/stores';
  storeUrl: string = API_BASE_URL + this.storeEndPoint;

  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  readRegistration() {
      return this.http.get<Registration[]>(this.registrationUrl, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
    });
  }

  readSubscription() {
      return this.http.get<Subscription[]>(this.subscriptionUrl, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
    });
  }

  readStore() {
      return this.http.get<Store[]>(this.storeUrl, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
    });
  }

}
