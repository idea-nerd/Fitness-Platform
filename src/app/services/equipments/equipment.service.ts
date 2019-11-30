import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Equipment } from '../../models/equipments.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  endPoint: string = '/api/equipments';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  create(payload: Equipment) {
    return this.http.post<Equipment>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  read() {
      return this.http.get<Equipment[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readSelected(id: number = 0) {
      return this.http.get<Equipment[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  update(payload: Equipment, id: number) {
    return this.http.put<Equipment>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

updateEquipmentImage(payload: Equipment, id: number) {
  return this.http.put<Equipment>(this.url + '/image/' + id, payload, {
   headers: new HttpHeaders({
     'Authorization': this.auth,
   }),
 });
}

  delete(id: number) {
    return this.http.delete<Equipment>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}
}
