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
import { LayoutRoutingModule } from './leads-routing.module';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { EditLeadComponent } from './edit-lead/edit-lead.component';
import { ViewLeadsComponent } from './view-leads/view-leads.component';
import { ShowLeadComponent } from './show-lead/show-lead.component';
import { LeadsComponent } from './leads.component';


@NgModule({
  declarations: [
    LeadsComponent,
    AddLeadComponent,
    EditLeadComponent,
    ViewLeadsComponent,
    ShowLeadComponent,
  ],
  imports: [
    CommonModule,
    NbDialogModule,
    FormsModule,
    ReactiveFormsModule,
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
    AddLeadComponent,
    EditLeadComponent,
    ShowLeadComponent,
  ],
})
export class LeadsModule { }
