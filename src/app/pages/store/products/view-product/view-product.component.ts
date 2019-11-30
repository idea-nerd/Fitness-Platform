import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Product } from './../../../../models/products.model';
import { ProductState } from './../../../../state/product.state';
import { Observable } from 'rxjs/Observable';
import { ReadProduct, DeleteProduct, SetSelectedProduct } from './../../../../actions/product.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { AddProductComponent } from './../add-product/add-product.component';
import { EditProductComponent } from './../edit-product/edit-product.component';
import { ShowProductComponent } from './../show-product/show-product.component';


@Component({
  selector: 'ngx-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {

  @Select(ProductState.getProducts) products$: Observable<Product>;

  source: LocalDataSource;
  settings: any = Settings;
  products: any = [];
  selected: string;
  productsPresent: boolean;

  constructor(private store: Store, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadProduct()).subscribe((res) => {
      this.productsPresent = res.products.products.length > 0;
    });
  }

  deleteProduct(id: number) {
    this.store.dispatch(new DeleteProduct(id));
  }

  editProduct(payload: Product) {
    this.store.dispatch(new SetSelectedProduct(payload));
  }

  onCreateSelect(): void {
    this.dialogService.open(AddProductComponent);
  }

  onViewSelect(): void {
    this.dialogService.open(ShowProductComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onEditSelect(): void {
    this.dialogService.open(EditProductComponent, {
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
