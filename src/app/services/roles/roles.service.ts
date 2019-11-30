import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Roles } from '../../models/roles.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  endPoint: string = '/api/roles';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }


  create(payload: Roles) {
    console.log('this role', payload);
    return this.http.post<Roles>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  read() {
      return this.http.get<Roles[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }
  readSelected(id: number = 0) {
      return this.http.get<Roles[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }
  update(payload: Roles, id: number) {
    return this.http.put<Roles>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}
  delete(payload: Roles, id: number) {
    return this.http.put<Roles>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }
}
