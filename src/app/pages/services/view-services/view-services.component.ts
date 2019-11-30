import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Service } from './../../../models/services.model';
import { ServiceState } from './../../../state/service.state';
import { Observable } from 'rxjs/Observable';
import { ReadService, DeleteService, SetSelectedService } from './../../../actions/service.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { AddServiceComponent } from './../add-service/add-service.component';
import { EditServiceComponent } from './../edit-service/edit-service.component';
import { ShowServiceComponent } from './../show-service/show-service.component';


@Component({
  selector: 'ngx-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.scss'],
})
export class ViewServicesComponent implements OnInit {

  @Select(ServiceState.getServices) services$: Observable<Service>;

  source: LocalDataSource;
  settings: any = Settings;
  services: any = [];
  selected: string;
  servicesPresent: boolean;

  constructor(private store: Store, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadService()).subscribe((res) => {
      this.servicesPresent = res.services.services.length > 0;
    });
  }

  deleteService(id: number) {
    this.store.dispatch(new DeleteService(id));
  }

  editService(payload: Service) {
    this.store.dispatch(new SetSelectedService(payload));
  }

  onCreateSelect(): void {
    this.dialogService.open(AddServiceComponent)
    .onClose.subscribe(() => {
      this.store.dispatch(new ReadService())
    });
  }

  onViewSelect(): void {
    this.dialogService.open(ShowServiceComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onEditSelect(): void {
    this.dialogService.open(EditServiceComponent, {
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
