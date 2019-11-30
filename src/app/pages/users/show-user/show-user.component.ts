import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { User } from './../../../models/users.model';
import { ReadSelectedUser } from './../../../actions/user.actions';

@Component({
  selector: 'ngx-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss'],
})
export class ShowUserComponent implements OnInit {

  @Input() id: any;
  user: User;

  constructor(private store: Store, protected ref: NbDialogRef<ShowUserComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadSelectedUser(this.id)).subscribe((res) => {
      this.user = res.users.selectedUserInstance[0];
    });
  }

  onAddSubscription(id: number) {
    console.log('Add Subscription', id);
  }

  onViewSubscription(id: number) {
    console.log('View Subscription', id);
  }

  onRenewSubscription(id: number) {
    console.log('Renew Subscription', id);
  }

  onArchiveSubscription(id: number) {
    console.log('Archive Subscription', id);
  }

  dismiss() {
    this.ref.close();
  }

}
