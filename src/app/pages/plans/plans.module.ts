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
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LayoutRoutingModule } from './plans-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { ViewPlansComponent } from './view-plans/view-plans.component';
import { ShowPlanComponent } from './show-plan/show-plan.component';
import { PlansComponent } from './plans.component';


@NgModule({
  declarations: [
    PlansComponent,
    AddPlanComponent,
    EditPlanComponent,
    ViewPlansComponent,
    ShowPlanComponent,
  ],
  imports: [
    CommonModule,
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
    AddPlanComponent,
    EditPlanComponent,
    ShowPlanComponent,
  ],
})
export class PlansModule { }
