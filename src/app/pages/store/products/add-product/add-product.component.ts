import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Product } from './../../../../models/products.model';
import { Store } from '@ngxs/store';
import { generateCode, generateStoreCode } from '../../../../helpers/helpers';
import { CreateProduct, ReadProduct } from './../../../../actions/product.actions';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  productsForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<AddProductComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.productsForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
      'description': new FormControl(null, [Validators.required, Validators.pattern(`[a-zA-Z0-9', ]*`)]),
      'category': new FormControl(null, [Validators.required]),
      'costPrice': new FormControl(null, [Validators.required]),
      'salePrice': new FormControl(null, [Validators.required]),
      'quantity': new FormControl(null, [Validators.required]),
    });
  }

  CreateProduct(payload: any) {
    this.store.dispatch(new CreateProduct(payload)).subscribe(() => {
      this.store.dispatch(new ReadProduct());
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  onSubmit = (payload: Product): void => {
    const fd = new FormData();
    fd.append('file', this.files[0], this.files[0].name);
    fd.append('name', payload.name);
    fd.append('description', payload.description);
    fd.append('quantity', payload.quantity);
    fd.append('category', payload.category);
    fd.append('costPrice', Number(payload.costPrice).toFixed(2));
    fd.append('salePrice', Number(payload.salePrice).toFixed(2));
    fd.append('status', 'Active');
    fd.append('productCode', generateCode('prod'));
    fd.append('storeCode', generateStoreCode());
    this.CreateProduct(fd);
  }

  dismiss() { this.ref.close(); }

  onSelect(event) {
   if (event.addedFiles)
     this.files.push(...event.addedFiles);
 }

 onRemove(event) { this.files.splice(this.files.indexOf(event), 1); }

 showToast(position, status) {
   if(status == 'success') {
     this.toastrService.show(
      status || 'Success',
      `New Product Added`,
      { position, status });
   } else if(status == 'danger') {
    this.toastrService.show(
      status || 'Success',
      `Failure To Add Product`,
      { position, status });
   }
  }

}
