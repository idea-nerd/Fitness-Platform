import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Equipment } from './../../../../models/equipments.model';
import { EquipmentState } from './../../../../state/equipment.state';
import { Observable } from 'rxjs/Observable';
import { ReadEquipment, DeleteEquipment, SetSelectedEquipment } from './../../../../actions/equipment.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { AddEquipmentComponent } from './../add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './../edit-equipment/edit-equipment.component';
import { ShowEquipmentComponent } from './../show-equipment/show-equipment.component';


@Component({
  selector: 'ngx-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.scss'],
})
export class ViewEquipmentComponent implements OnInit {

  @Select(EquipmentState.getEquipments) equipments$: Observable<Equipment>;

  source: LocalDataSource;
  settings: any = Settings;
  equipments: any = [];
  selected: string;
  equipmentsPresent: boolean;

  constructor(private store: Store, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadEquipment()).subscribe((res) => {
      this.equipmentsPresent = res.equipments.equipments.length > 0;
    });
  }

  deleteEquipment(id: number) {
    this.store.dispatch(new DeleteEquipment(id));
  }

  editEquipment(payload: Equipment) {
    this.store.dispatch(new SetSelectedEquipment(payload));
  }

  onCreateSelect(): void {
    this.dialogService.open(AddEquipmentComponent);
  }

  onViewSelect(): void {
    this.dialogService.open(ShowEquipmentComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onEditSelect(): void {
    this.dialogService.open(EditEquipmentComponent, {
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
