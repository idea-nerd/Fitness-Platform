import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Expense } from './../../../../models/expenses.model';
import { Store } from '@ngxs/store';
import { generateCode } from '../../../../helpers/helpers';
import { CreateExpense, ReadExpense } from './../../../../actions/expense.actions';

@Component({
  selector: 'ngx-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  expensesForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<AddExpenseComponent>) { }

  ngOnInit() {
    this.expensesForm = new FormGroup({
      'note': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
      'amount': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
      'dueDate': new FormControl(null, [Validators.required]),
      'paid': new FormControl(null, [Validators.required]),
    });
  }

  CreateExpense(payload: any) {
    this.store.dispatch(new CreateExpense(payload)).subscribe(() => {
      this.store.dispatch(new ReadExpense());
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  onSubmit = (payload: Expense): void => {
    payload.expenseCode = generateCode('expe');
    payload.status = 'Active';
    this.CreateExpense(payload);
  }

  dismiss() { this.ref.close(); }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `New Expense Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add Expense`,
       { position, status });
    }
   }
}
