import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { User } from './../../../models/users.model';
import { UserState } from './../../../state/user.state';
import { Observable } from 'rxjs/Observable';
import { ReadUser, DeleteUser, SetSelectedUser } from './../../../actions/user.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { CreateUserComponent } from './../add-user/add-user.component';
import { EditUserComponent } from './../edit-user/edit-user.component';
import { ShowUserComponent } from './../show-user/show-user.component';

@Component({
  selector: 'ngx-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {

  @Select(UserState.getUsers) users$: Observable<User>;

  source: LocalDataSource;
  settings: any = Settings;
  users: any = [];
  selected: string;

  constructor(private store: Store, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadUser());
  }

  deleteUser(payload: User, id: number) {
    this.store.dispatch(new DeleteUser(id));
  }

  editUser(payload: User) {
    this.store.dispatch(new SetSelectedUser(payload));
  }

  onCreateSelect(): void {
    this.dialogService.open(CreateUserComponent);
  }

  onViewSelect(): void {
    this.dialogService.open(ShowUserComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onEditSelect(): void {
    this.dialogService.open(EditUserComponent, {
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
