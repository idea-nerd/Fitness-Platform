import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { Sale } from './../../../../models/sales.model';
import { Product } from './../../../../models/products.model';
import { ReadProduct } from './../../../../actions/product.actions';
import { ProductState } from './../../../../state/product.state';
import { UpdateSale, ReadSelectedSale, DeleteSale, ReadSale } from './../../../../actions/sale.actions';

@Component({
  selector: 'ngx-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.scss'],
})
export class EditSaleComponent implements OnInit {

  @Input() id: any;
  @Select(ProductState.getProducts) products$: Observable<Product>;
  sale: Sale;
  salesForm: FormGroup;
  selectedProduct: any;
  selectedQuantity: any;
  selectedDiscount: any;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditSaleComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadProduct());
    this.store.dispatch(new ReadSelectedSale(this.id)).subscribe((res) => {
      this.sale = res.sales.selectedSaleInstance[0];
      this.salesForm = new FormGroup({
        'productCode': new FormControl(this.sale.productCode, [Validators.required]),
        'quantity': new FormControl(this.sale.quantity, [Validators.required]),
        'amount': new FormControl(this.sale.amount, [Validators.required]),
        'discountPercent': new FormControl(this.sale.discountPercent, [Validators.required]),
        'discountNote': new FormControl(this.sale.discountNote, [Validators.required]),
        'firstName': new FormControl(this.sale.firstName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z' ]*`)]),
        'lastName': new FormControl(this.sale.lastName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z' ]*`)]),
        'address': new FormControl(this.sale.address, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'phone': new FormControl(this.sale.phone, [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      });
    });
  }

  calculatePrice() {
    if (this.selectedDiscount)
      return (((this.selectedProduct.salePrice * this.selectedQuantity)) - ((this.selectedProduct.salePrice * this.selectedQuantity) * ( this.selectedDiscount / 100 ))).toFixed(2);
  }

  UpdateSale(payload: Sale, id: number) {
    this.store.dispatch(new UpdateSale({ ...payload}, id));
  }

  onSubmit = (payload: Sale): void => {
     this.UpdateSale(payload, this.id);
  }

  onArchive = (payload: Sale): void => {
    this.store.dispatch(new DeleteSale({ ...payload}, this.id)).subscribe(() => {
      this.store.dispatch(new ReadSale());
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  dismiss() {
    this.ref.close();
  }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `Sale Deleted Successfully`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Delete Sale`,
       { position, status });
    }
   }
}
