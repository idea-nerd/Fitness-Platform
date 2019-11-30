import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  registrationEndPoint: string = '/api/dashboard';
  registrationUrl: string = API_BASE_URL + this.registrationEndPoint;
  auth: string;
  userRole: any;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.auth = 'bearer ' + token;
        this.userRole = token.getPayload(); 
        this.userRole = this.userRole.payload[0].role;
      }
    });
  }

  read() {
    if (this.userRole == "Owner") {
      return this.http.get<any[]>(this.registrationUrl + '/owner', {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
    }
    if (this.userRole == "Manager") {
      return this.http.get<any[]>(this.registrationUrl + '/manager', {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
    }
    if (this.userRole == "Trainer") {
      return this.http.get<any[]>(this.registrationUrl + '/trainer', {
        headers: new HttpHeaders({
          'Authorization': this.auth,
        }),
      });
    }
  }
      

}
