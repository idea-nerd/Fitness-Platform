import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Lead } from './../../../models/leads.model';
import { ReadSelectedLead } from './../../../actions/lead.actions';

@Component({
  selector: 'ngx-show-lead',
  templateUrl: './show-lead.component.html',
  styleUrls: ['./show-lead.component.scss'],
})
export class ShowLeadComponent implements OnInit {

  @Input() id: any;
  lead: Lead;

  constructor(private store: Store, protected ref: NbDialogRef<ShowLeadComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadSelectedLead(this.id)).subscribe((res) => {
      this.lead = res.leads.selectedLeadInstance[0];
    });
  }

  dismiss() {
    this.ref.close();
  }

}
