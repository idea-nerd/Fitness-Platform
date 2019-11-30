import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Lead } from '../../models/leads.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class LeadService {

  endPoint: string = '/api/leads';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  create(payload: Lead) {
    return this.http.post<Lead>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  read() {
      return this.http.get<Lead[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelected(id: number = 0) {
      return this.http.get<Lead[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readTrainer() {
    return this.http.get<Lead[]>(this.url + '/trainer', {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  readAppointment(id: number = 0) {
    return this.http.get<Lead[]>(this.url + '/appointment', {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  update(payload: Lead, id: number) { console.log('service', payload,id)
    return this.http.put<Lead>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

updateLeadImage(payload: Lead, id: number) {
  return this.http.put<Lead>(this.url + '/image/' + id, payload, {
   headers: new HttpHeaders({
     'Authorization': this.auth,
   }),
 });
}

  delete(id: number) {
    return this.http.delete<Lead>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}
}
