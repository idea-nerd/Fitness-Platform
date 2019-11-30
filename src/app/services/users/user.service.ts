import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { User } from '../../models/users.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  endPoint: string = '/api/users';
  url: string = API_BASE_URL + this.endPoint;
  auth: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.auth = 'bearer ' + token;
    });
  }

  create(payload: User) {
    return this.http.post<User>(this.url, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  read() {
      return this.http.get<User[]>(this.url, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readTrainers() { console.log('here')
    return this.http.get<User[]>(this.url + '/trainers', { 
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  readSelected(id: number = 0) {
      return this.http.get<User[]>(this.url + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
  }

  readAuthenticated(id: number = 0) {
    return this.http.get<User[]>(this.url + '/authenticated/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  update(payload: User, id: number) {
    return this.http.put<User>(this.url + '/' + id, payload, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}

  updateUserImage(payload: User, id: number) {
   return this.http.put<User>(this.url + '/image/' + id, payload, {
    headers: new HttpHeaders({
      'Authorization': this.auth,
    }),
  });
}

  delete(id: number) {
    return this.http.delete<User>(this.url + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.auth,
      }),
    });
}
}
