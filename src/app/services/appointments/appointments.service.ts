import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Appointment } from '../../models/appointments.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {

  endPoint: string = '/api/appointments';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  create(payload: Appointment) {
    return this.http.post<Appointment>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  read() {
      return this.http.get<Appointment[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelected(id: number = 0) {
      return this.http.get<Appointment[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  update(payload: Appointment, id: number) { console.log('exit', payload, 'id', id);
    return this.http.put<Appointment>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  delete(id: number) {
    return this.http.delete<Appointment>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}
}
