import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Client } from '../../../models/clients.model';
import { API_BASE_URL } from '../../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  endPoint: string = '/api/clients';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  create(payload: Client) {
    return this.http.post<Client>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  read() {
      return this.http.get<Client[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelected(id: number = 0) {
      return this.http.get<Client[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readExpired() {
    return this.http.get<Client[]>(this.url + '/expired', {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  readAppointment(id: number = 0) {
    return this.http.get<Client[]>(this.url + '/appointment', {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  readTrainersClients() {
    return this.http.get<Client[]>(this.url + '/trainers', {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }


  update(payload: Client, id: number) {
    return this.http.put<Client>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  updateClientImage(payload: Client, id: number) {
    return this.http.put<Client>(this.url + '/image/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

  delete(id: number) {
    return this.http.delete<Client>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }

}
