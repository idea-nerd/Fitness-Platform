import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Expense } from './../../../../models/expenses.model';
import { Store } from '@ngxs/store';
import { UpdateExpense, ReadSelectedExpense, ReadExpense, DeleteExpense } from './../../../../actions/expense.actions';

@Component({
  selector: 'ngx-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent implements OnInit {

  @Input() id: any;
  expense: Expense;
  expensesForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  message: any = {
    expenseUpdated: 'Expense Successfully Updated',
    expenseUpdateFailed: 'Expense Update Failed',
    expenseDeleted: 'Expense Successfully Deleted',
    expenseDeleteFailed: 'Expense Delete Failed',
}
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditExpenseComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.store.dispatch(new ReadSelectedExpense(this.id)).subscribe((res) => {
      this.expense = res.expenses.selectedExpenseInstance[0];
      this.expense.dueDate = new Date(this.expense.dueDate)
      this.expensesForm = new FormGroup({
        'note': new FormControl(this.expense.note, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'amount': new FormControl(this.expense.amount, [Validators.required]),
        'category': new FormControl(this.expense.category, [Validators.required]),
        'dueDate': new FormControl(this.expense.dueDate, [Validators.required]),
        'paid': new FormControl(this.expense.paid, [Validators.required]),
      });
    });
  }

  UpdateExpense(payload: any, id: number) {
    this.store.dispatch(new UpdateExpense(payload, id)).subscribe(() => {
      this.store.dispatch(new ReadExpense());
      this.showToast('top-right', 
                       'success', 
                      this.message.expenseUpdated);
      this.dismiss();
    });
  }

  onSubmit = (payload: Expense): void => {
    this.UpdateExpense(payload, this.id);
  }

  onArchive() {
    this.store.dispatch(new DeleteExpense(this.id)).subscribe(() => {
      this.store.dispatch(new ReadExpense());
      this.showToast('top-right', 
                       'success', 
                       this.message.expenseDeleted);
      this.dismiss();
    });
  }

  dismiss() { this.ref.close(); }

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
