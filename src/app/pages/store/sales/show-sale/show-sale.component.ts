import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Sale } from './../../../../models/sales.model';
import { ReadSelectedSale } from './../../../../actions/sale.actions';



@Component({
  selector: 'ngx-show-sale',
  templateUrl: './show-sale.component.html',
  styleUrls: ['./show-sale.component.scss'],
})
export class ShowSaleComponent implements OnInit {

  @Input() id: any;
  sale: Sale;

  constructor(private store: Store, protected ref: NbDialogRef<ShowSaleComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedSale(this.id)).subscribe((res) => {
      this.sale = res.sales.selectedSaleInstance[0];
    });
  }

  dismiss() {
    this.ref.close();
  }

}
