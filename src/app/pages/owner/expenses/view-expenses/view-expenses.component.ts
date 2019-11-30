import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Expense } from './../../../../models/expenses.model';
import { ExpenseState } from './../../../../state/expense.state';
import { Observable } from 'rxjs/Observable';
import { ReadExpense, DeleteExpense, SetSelectedExpense } from './../../../../actions/expense.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { AddExpenseComponent } from './../add-expense/add-expense.component';
import { EditExpenseComponent } from './../edit-expense/edit-expense.component';
import { ShowExpenseComponent } from './../show-expense/show-expense.component';


@Component({
  selector: 'ngx-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.scss'],
})
export class ViewExpensesComponent implements OnInit {

  @Select(ExpenseState.getExpenses) expenses$: Observable<Expense>;

  source: LocalDataSource;
  settings: any = Settings;
  expenses: any = [];
  selected: string;
  expensesPresent: boolean;

  constructor(private store: Store, private dialogExpense: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadExpense()).subscribe((res) => { console.log('test', res.expenses.expenses, '2', res.expenses.expenses.length )
      this.expensesPresent = res.expenses.expenses.length > 0 && res.expenses.expenses.length != 0; console.log('expensepresesnt', this.expensesPresent)
    });
  }

  deleteExpense(id: number) {
    this.store.dispatch(new DeleteExpense(id));
  }

  editExpense(payload: Expense) {
    this.store.dispatch(new SetSelectedExpense(payload));
  }

  onCreateSelect(): void {
    this.dialogExpense.open(AddExpenseComponent)
    .onClose.subscribe(() => {
      this.store.dispatch(new ReadExpense())
    });
  }

  onViewSelect(): void {
    this.dialogExpense.open(ShowExpenseComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onEditSelect(): void {
    this.dialogExpense.open(EditExpenseComponent, {
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
