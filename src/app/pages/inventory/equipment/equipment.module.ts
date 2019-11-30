import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LayoutRoutingModule } from './equipments-routing.module';
import { LoaderModule } from './../../../@theme/components/loader/loader.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './edit-equipment/edit-equipment.component';
import { ViewEquipmentComponent } from './view-equipment/view-equipment.component';
import { ShowEquipmentComponent } from './show-equipment/show-equipment.component';
import { EquipmentComponent } from './equipment.component';


@NgModule({
  declarations: [
    EquipmentComponent,
    AddEquipmentComponent,
    EditEquipmentComponent,
    ViewEquipmentComponent,
    ShowEquipmentComponent,
  ],
  imports: [
    CommonModule,
    LoaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbDialogModule.forRoot(),
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    LayoutRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    AddEquipmentComponent,
    EditEquipmentComponent,
    ShowEquipmentComponent,
  ],
})
export class EquipmentModule { }
