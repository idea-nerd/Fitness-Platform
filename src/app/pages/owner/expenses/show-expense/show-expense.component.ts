import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Expense } from './../../../../models/expenses.model';
import { ReadSelectedExpense } from './../../../../actions/expense.actions';



@Component({
  selector: 'ngx-show-expense',
  templateUrl: './show-expense.component.html',
  styleUrls: ['./show-expense.component.scss'],
})
export class ShowExpenseComponent implements OnInit {

  @Input() id: any;
  expense: Expense;

  constructor(private store: Store, protected ref: NbDialogRef<ShowExpenseComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedExpense(this.id)).subscribe((res) => {
      this.expense = res.expenses.selectedExpenseInstance[0];
    });
  }

  dismiss() {
    this.ref.close();
  }

}
