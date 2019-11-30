import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ClientDetails } from '../../../models/clientDetails.model';
import { API_BASE_URL } from '../../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class ClientDetailsService {

  endPoint: string = '/api/clientDetails';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  create(payload: ClientDetails) {
    return this.http.post<ClientDetails>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  read() {
      return this.http.get<ClientDetails[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelected(id: number = 0) {
      return this.http.get<ClientDetails[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelectedDetails(id: number = 0) {
    return this.http.get<ClientDetails[]>(this.url + '/detail/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  update(payload: ClientDetails, id: number) {
    return this.http.put<ClientDetails>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  delete(id: number) {
    return this.http.delete<ClientDetails>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}
}
