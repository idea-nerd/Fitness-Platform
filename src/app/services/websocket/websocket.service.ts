import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attendance } from '../../models/attendance.model';
import { API_BASE_URL } from '../../configs/api';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  
  socket: any;
  readonly url: string = API_BASE_URL;

  constructor() { 
    this.socket = io(this.url);
  }

  

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
