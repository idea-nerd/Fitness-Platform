import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InvoiceDetail } from '../../models/invoiceDetail.model';
import { API_BASE_URL } from '../../configs/api';

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailService {

  endPoint: string = 'invoiceDetails';
  url: string = API_BASE_URL + this.endPoint;

  constructor(private http: HttpClient) { }

  create(payload: InvoiceDetail) {
    return this.http.post<InvoiceDetail>(this.url, payload);
  }

  read() {
      return this.http.get<InvoiceDetail[]>(this.url);
  }

  readSelected(id: number = 0) {
      return this.http.get<InvoiceDetail[]>(this.url + '/' + id);
  }

  update(payload: InvoiceDetail, id: number) {
    return this.http.put<InvoiceDetail>(this.url + '/' + id, payload);
  }

  delete(payload: InvoiceDetail, id: number) {
    return this.http.put<InvoiceDetail>(this.url + '/' + id, payload);
  }
}
