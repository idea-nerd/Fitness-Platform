import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Sale } from './../../../../models/sales.model';
import { SaleState } from './../../../../state/sale.state';
import { Observable } from 'rxjs/Observable';
import { ReadSale, DeleteSale, SetSelectedSale } from './../../../../actions/sale.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { AddSaleComponent } from './../add-sale/add-sale.component';
import { EditSaleComponent } from './../edit-sale/edit-sale.component';
import { ShowSaleComponent } from './../show-sale/show-sale.component';


@Component({
  selector: 'ngx-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.scss'],
})
export class ViewSaleComponent implements OnInit {

  @Select(SaleState.getSales) sales$: Observable<Sale>;

  source: LocalDataSource;
  settings: any = Settings;
  sales: any = [];
  selected: string;
  salesPresent: boolean;

  constructor(private store: Store, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadSale()).subscribe((res) => {
      this.salesPresent = res.sales.sales.length > 0;
    });
  }

  deleteSale(payload: Sale, id: number) {
    this.store.dispatch(new DeleteSale(payload, id));
  }

  editSale(payload: Sale) {
    this.store.dispatch(new SetSelectedSale(payload));
  }

  onCreateSelect(): void {
    this.dialogService.open(AddSaleComponent);
  }

  onViewSelect(): void {
    this.dialogService.open(ShowSaleComponent, {
      context: { id: this.selected },
      hasScroll: true,
      autoFocus: false,
      closeOnEsc: true,
    });
  }

  onEditSelect(): void {
    this.dialogService.open(EditSaleComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onSelected(event): void {
    if (event.isSelected)
      this.selected = event.data.id;
  }

}
