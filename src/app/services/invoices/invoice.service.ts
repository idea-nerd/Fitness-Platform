import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoice } from '../../models/invoices.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {

  endPoint: string = 'invoices';
  url: string = API_BASE_URL + this.endPoint;

  constructor(private http: HttpClient) { }

  create(payload: Invoice) {
    return this.http.post<Invoice>(this.url, payload);
  }

  read() {
      return this.http.get<Invoice[]>(this.url);
  }

  readSelected(id: number = 0) {
      return this.http.get<Invoice[]>(this.url + '/' + id);
  }

  update(payload: Invoice, id: number) {
    return this.http.put<Invoice>(this.url + '/' + id, payload);
  }

  delete(payload: Invoice, id: number) {
    return this.http.put<Invoice>(this.url + '/' + id, payload);
  }
}
