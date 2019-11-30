import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Service } from './../../../models/services.model';
import { ReadSelectedService } from './../../../actions/service.actions';



@Component({
  selector: 'ngx-show-service',
  templateUrl: './show-service.component.html',
  styleUrls: ['./show-service.component.scss'],
})
export class ShowServiceComponent implements OnInit {

  @Input() id: any;
  service: Service;

  constructor(private store: Store, protected ref: NbDialogRef<ShowServiceComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedService(this.id)).subscribe((res) => {
      this.service = res.services.selectedServiceInstance[0];
    });
  }

  dismiss() {
    this.ref.close();
  }

}
