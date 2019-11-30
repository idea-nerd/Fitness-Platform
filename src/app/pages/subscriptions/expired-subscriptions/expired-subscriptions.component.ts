import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'ngx-expired-subscriptions',
  templateUrl: './expired-subscriptions.component.html',
  styleUrls: ['./expired-subscriptions.component.scss']
})
export class ExpiredSubscriptionsComponent implements OnInit {
  @Input() image: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() endDate: any;
  @Input() email: any;
  @Input() phone: any;
  @Input() status: any;
  @Input() amount: any;

  public pendingDeactivation: any;

  constructor() { }

  ngOnInit() {

    const limit = moment("2 months ago", 'yyyy-mm-dd')

    if (moment(this.endDate, 'yyyy-mm-dd').isAfter(limit)){
        this.pendingDeactivation = true;
    }
    else {
      this.pendingDeactivation = false;
    }
  }

}
