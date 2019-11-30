import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Sale } from './../../../../models/sales.model';
import { Product } from './../../../../models/products.model';
import { generateCode, generateStoreCode } from '../../../../helpers/helpers';
import { CreateSale, ReadSale } from './../../../../actions/sale.actions';
import { ReadProduct } from './../../../../actions/product.actions';
import { ProductState } from './../../../../state/product.state';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss'],
})
export class AddSaleComponent implements OnInit {

  @Select(ProductState.getProducts) products$: Observable<Product>;

  salesForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<AddSaleComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadProduct());
    this.salesForm = new FormGroup({
        'productCode': new FormControl(null, [Validators.required]),
        'quantity': new FormControl(null, [Validators.required]),
        'discountPercent': new FormControl(null, [Validators.required]),
        'discountNote': new FormControl(null, [Validators.required]),
        'firstName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z' ]*`)]),
        'lastName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z' ]*`)]),
        'address': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'phone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      });
  }

  CreateSale(payload: Sale) {
    payload.transactionCode = generateCode('trans');
    payload.storeCode = generateStoreCode();
    payload.amount = this.calculatePrice().toString();

    const today = new Date();
    const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + (today.getDate());

    payload.date = date;
    const product = this.salesForm.value.productCode.split('|');
    payload.image = product[2];
    payload.storeQuantity = product[3];
    payload.productCode = product[0];

    this.store.dispatch(new CreateSale({ ...payload})).subscribe(() => {
        this.store.dispatch(new ReadSale());
        this.showToast('top-right', 'success');
        this.dismiss();
      });
    }

   calculatePrice() {
      const product = this.salesForm.value.productCode.split('|');
      const productPrice = product[1];
      const salePrice = parseFloat(productPrice);
      const cost = ((salePrice * this.salesForm.value.quantity) - ((salePrice * this.salesForm.value.quantity) * ( this.salesForm.value.discountPercent / 100 ))).toFixed(2);
      return cost;
  }

  onSubmit = (payload: Sale): void => { this.CreateSale(payload); };

  dismiss() { this.ref.close(); }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `New Sale Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add Sale`,
       { position, status });
    }
   }
}
