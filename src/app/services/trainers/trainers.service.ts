import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root'
})

export class TrainersService {

  trainerEndPoint: string = '/api/trainers';
  trainerUrl: string = API_BASE_URL + this.trainerEndPoint;
  auth: string;


  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  readTrainerClients() {
    return this.http.get<any[]>(this.trainerUrl + '/clients', {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
  }
}