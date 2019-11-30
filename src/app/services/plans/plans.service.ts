import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Plan } from '../../models/plans.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class PlanService {

  endPoint: string = '/api/plans';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  create(payload: Plan) {
    return this.http.post<Plan>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  read() {
      return this.http.get<Plan[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelected(id: number = 0) {
      return this.http.get<Plan[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  update(payload: Plan, id: number) {
    return this.http.put<Plan>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  delete(id: number) {
    return this.http.delete<Plan>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}
}
