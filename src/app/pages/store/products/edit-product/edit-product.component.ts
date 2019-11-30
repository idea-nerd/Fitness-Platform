import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Product } from './../../../../models/products.model';
import { Store } from '@ngxs/store';
import { UpdateProduct, ReadSelectedProduct, ReadProduct, DeleteProduct, UpdateProductImage } from './../../../../actions/product.actions';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  @Input() id: any;
  product: Product;
  productsForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  message: any = {
      productUpdated: 'Product Successfully Updated',
      productUpdateFailed: 'Product Update Failed',
      productDeleted: 'Product Successfully Deleted',
      productDeleteFailed: 'Product Delete Failed',
  }
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditProductComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.store.dispatch(new ReadSelectedProduct(this.id)).subscribe((res) => {
      this.product = res.products.selectedProductInstance[0];
      this.productsForm = new FormGroup({
        'name': new FormControl(this.product.name, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'description': new FormControl(this.product.description, [Validators.required, Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'quantity': new FormControl(this.product.quantity, [Validators.required]),
        'costPrice': new FormControl(this.product.costPrice, [Validators.required]),
        'salePrice': new FormControl(this.product.salePrice, [Validators.required]),
        'category': new FormControl(this.product.category, [Validators.required]),
      });
    });
  }

  UpdateProduct(payload: any, id: number) {
    if (this.files.length > 0) {
        this.store.dispatch(new UpdateProductImage(payload, id)).subscribe(() => {
        this.store.dispatch(new ReadProduct());
        this.showToast('top-right', 
                       'success', 
                       this.message.productUpdated);
        this.dismiss();
      });
    } else {
      this.store.dispatch(new UpdateProduct({...payload}, id)).subscribe(() => {
        this.store.dispatch(new ReadProduct());
        this.showToast('top-right', 
                       'success', 
                      this.message.productUpdated);
        this.dismiss();
      });
    }
  }

  onSubmit = (payload: Product): void => {
    const fd = new FormData();
    if (this.files.length > 0) {
      fd.append('file', this.files[0], this.files[0].name);
      fd.append('name', payload.name);
      fd.append('description', payload.description);
      fd.append('quantity', payload.quantity);
      fd.append('category', payload.category);
      fd.append('costPrice', Number(payload.costPrice).toFixed(2));
      fd.append('salePrice', Number(payload.salePrice).toFixed(2));
      this.UpdateProduct(fd, this.id);
    } else {
      this.UpdateProduct(payload, this.id);
    }

  }

  onArchive() {
    this.store.dispatch(new DeleteProduct(this.id)).subscribe(() => {
      this.store.dispatch(new ReadProduct());
      this.showToast('top-right', 
                       'success', 
                       this.message.productDeleted);
      this.dismiss();
    });
  }

  dismiss() { this.ref.close(); }

  onSelect(event) {
   if (event.addedFiles)
     this.files.push(...event.addedFiles);
 }

 onRemove(event) { this.files.splice(this.files.indexOf(event), 1); }

 showToast(position, status, message) {
  if(status == 'success') {
    this.toastrService.show(
     status || 'Success',
     `${message}`,
     { position, status });
  } else if(status == 'danger') {
   this.toastrService.show(
     status || 'Success',
     `${message}`,
     { position, status });
  }
 }
}
