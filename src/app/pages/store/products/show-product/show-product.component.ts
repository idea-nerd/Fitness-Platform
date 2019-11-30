import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Product } from './../../../../models/products.model';
import { ReadSelectedProduct } from './../../../../actions/product.actions';



@Component({
  selector: 'ngx-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss'],
})
export class ShowProductComponent implements OnInit {

  @Input() id: any;
  product: Product;

  constructor(private store: Store, protected ref: NbDialogRef<ShowProductComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedProduct(this.id)).subscribe((res) => {
      this.product = res.products.selectedProductInstance[0];
    });
  }

  dismiss() {
    this.ref.close();
  }

}
