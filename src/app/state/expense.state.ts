import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Expense } from '../models/expenses.model';
import { CreateExpense, ReadExpense, ReadSelectedExpense, UpdateExpense, DeleteExpense, SetSelectedExpense } from './../actions/expense.actions';
import { ExpensesExpense } from '../services/expenses/expenses.service';
import {tap} from 'rxjs/operators';

export class ExpenseStateModel {
    expenses: Expense[];
    selectedExpenseInstance: Expense[];
    selectedExpense: Expense;
}

@State<ExpenseStateModel>({
    name: 'expenses',
    defaults: {
        expenses: [],
        selectedExpenseInstance: [],
        selectedExpense: null,
    },
})

export class ExpenseState {

    constructor(private expenseExpense: ExpensesExpense) { }

    @Selector()
    static getExpenses(state: ExpenseStateModel) {
        return state.expenses;
    }

    @Selector()
    static getSelectedExpense(state: ExpenseStateModel) {
        return state.selectedExpense;
    }

    @Selector()
    static getSelectedExpenseInstance(state: ExpenseStateModel) {
        return state.selectedExpenseInstance;
    }

    @Action(CreateExpense)
    createExpense({getState, patchState}: StateContext<ExpenseStateModel>, { payload }: CreateExpense) {
        return this.expenseExpense.create(payload).pipe(tap((result) => {
            console.log('req resul', result);
            const state = getState();
            patchState({
                expenses: [...state.expenses, result],
            });
        }));

    }

    @Action(ReadExpense)
    readExpense({getState, setState}: StateContext<ExpenseStateModel>) {
        return this.expenseExpense.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                expenses: result,
            });
        }));

    }

    @Action(ReadSelectedExpense)
    readSelectedExpense({getState, setState}: StateContext<ExpenseStateModel>, { id }: ReadSelectedExpense ) {
        return this.expenseExpense.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedExpenseInstance: result,
            });
        }));

    }

    @Action(UpdateExpense)
    updateExpense({getState, setState}: StateContext<ExpenseStateModel>, { payload, id }: UpdateExpense) {
        return this.expenseExpense.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const expenseList = [...state.expenses];
            const expenseIndex = expenseList.findIndex(item => item.id === id);
            expenseList[expenseIndex] = result;
            setState({
                ...state,
                expenses: expenseList,
            });
        }));
    }

    @Action(DeleteExpense)
    deleteExpense({getState, setState}: StateContext<ExpenseStateModel>, { id }: DeleteExpense) {
        return this.expenseExpense.delete(id).pipe(tap((result) => {
            const state = getState();
            const expenseList = [...state.expenses];
            const expenseIndex = expenseList.findIndex(item => item.id === id);
            expenseList[expenseIndex] = result;
            setState({
                ...state,
                expenses: expenseList,
            });
        }));
    }

    @Action(SetSelectedExpense)
    setSelectedExpenseId({getState, setState}: StateContext<ExpenseStateModel>, {payload}: SetSelectedExpense) {
        const state = getState();
        setState({
            ...state,
            selectedExpense: payload,
        });
    }

}

