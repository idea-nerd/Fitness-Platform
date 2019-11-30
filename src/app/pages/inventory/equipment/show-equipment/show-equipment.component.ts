import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Equipment } from './../../../../models/equipments.model';
import { ReadSelectedEquipment } from './../../../../actions/equipment.actions';



@Component({
  selector: 'ngx-show-equipment',
  templateUrl: './show-equipment.component.html',
  styleUrls: ['./show-equipment.component.scss'],
})
export class ShowEquipmentComponent implements OnInit {

  @Input() id: any;
  equipment: Equipment;

  constructor(private store: Store, protected ref: NbDialogRef<ShowEquipmentComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedEquipment(this.id)).subscribe((res) => {
      this.equipment = res.equipments.selectedEquipmentInstance[0];
    });
  }

  dismiss() {
    this.ref.close();
  }

}
