import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { Store, Select } from "@ngxs/store";
import { Subscription } from "./../../../models/subscriptions.model";
import { SubscriptionState } from "./../../../state/subscription.state";
import { Observable } from "rxjs/Observable";
import {
  ReadSubscription,
  DeleteSubscription,
  SetSelectedSubscription
} from "./../../../actions/subscription.actions";

import { Settings } from "./settings";

import { NbDialogService } from "@nebular/theme";
import { ShowSubscriptionComponent } from "./../show-subscription/show-subscription.component";
import { ReadExpiredClient } from '../../../actions/client.actions';

@Component({
  selector: "ngx-view-subscriptions",
  templateUrl: "./view-subscriptions.component.html",
  styleUrls: ["./view-subscriptions.component.scss"]
})
export class ViewSubscriptionsComponent implements OnInit {
  @Select(SubscriptionState.getSubscriptions) subscriptions$: Observable<
    Subscription
  >;

  source: LocalDataSource;
  settings: any = Settings;
  subscriptions: any = [];
  selected: string;
  subscriptionsPresent: boolean;
  expiredSubscriptions: any = [];

  constructor(private store: Store, private dialogService: NbDialogService) {}

  ngOnInit() {
    this.store.dispatch(new ReadSubscription()).subscribe(res => {
      this.subscriptionsPresent = res.subscriptions.subscriptions.length > 0;
    });
    this.store.dispatch(new ReadExpiredClient()).subscribe(res => {
      this.expiredSubscriptions = res.clients.expiredClients;
      console.log('test', this.expiredSubscriptions )
    });
  }

  deleteSubscription(id: number) {
    this.store.dispatch(new DeleteSubscription(id));
  }

  editSubscription(payload: Subscription) {
    this.store.dispatch(new SetSelectedSubscription(payload));
  }

  onViewSelect(): void {
    this.dialogService.open(ShowSubscriptionComponent, {
      context: {
        id: this.selected
      }
    });
  }

  onSelected(event): void {
    if (event.isSelected) this.selected = event.data.id;
  }
}
