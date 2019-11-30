import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Subscription } from './../../../models/subscriptions.model';
import { ReadSelectedSubscription, ReadSelectedClientSubscription, DeleteSubscription } from './../../../actions/subscription.actions';

@Component({
  selector: 'ngx-archive-subscription',
  templateUrl: './archive-subscription.component.html',
  styleUrls: ['./archive-subscription.component.scss'],
})

export class ArchiveSubscriptionComponent implements OnInit {

  @Input() id: any;
  @Input() code: any;
  subscription: Subscription;

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<ArchiveSubscriptionComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadSelectedSubscription(this.id)).subscribe((res) => {
      this.subscription = res.subscriptions.selectedSubscriptionInstance[0];
    });
  }

  archive() {
    this.store.dispatch(new DeleteSubscription(this.subscription.subscriptionCode)).subscribe(() => {
      this.store.dispatch(new ReadSelectedClientSubscription(this.code));
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
       `Subscription Successfully Removed`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Remove Subscription`,
       { position, status });
    }
   }

}
