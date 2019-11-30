import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentComponent } from './equipment.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './edit-equipment/edit-equipment.component';
import { ViewEquipmentComponent } from './view-equipment/view-equipment.component';

const routes: Routes = [{
  path: '',
  component: EquipmentComponent,
  children: [
    {
      path: 'equipment',
      component: EquipmentComponent,
    },
    {
      path: 'add',
      component: AddEquipmentComponent,
    },
    {
      path: 'edit',
      component: EditEquipmentComponent,
    },
    {
      path: 'view',
      component: ViewEquipmentComponent,
    },
  ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
