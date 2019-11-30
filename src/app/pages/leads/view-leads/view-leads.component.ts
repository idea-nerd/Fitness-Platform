import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2'
import { Store, Select } from '@ngxs/store';
import { Lead } from './../../../models/leads.model';
import { LeadState } from './../../../state/lead.state';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ReadLead, DeleteLead, SetSelectedLead, ReadTrainerLead, UpdateLead } from './../../../actions/lead.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AddLeadComponent } from './../add-lead/add-lead.component';
import { EditLeadComponent } from './../edit-lead/edit-lead.component';
import { ShowLeadComponent } from './../show-lead/show-lead.component';

@Component({
  selector: 'ngx-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.scss'],
})
export class ViewLeadsComponent implements OnInit {

  @Select(LeadState.getLeads) leads$: Observable<Lead>;
  @Select(LeadState.getTrainerLeadInstance) lead$: Observable<Lead>;

  source: LocalDataSource;
  settings: any = Settings;
  leads: any = [];
  selected: string;
  selectedData: any;
  user: any;
  leadsPresent: boolean;

  constructor(private authService: NbAuthService, private store: Store, private dialogService: NbDialogService,  private router: Router) { 
    this.authService.onTokenChange()
                .subscribe((token: NbAuthJWTToken) => {
                  if (token.isValid()) {
                    this.user = token.getPayload();
                    this.user = this.user.payload[0];
                  }
              });
  }

  ngOnInit() {
    if(this.user.role == 'Trainer'){
      this.store.dispatch(new ReadTrainerLead()).subscribe((res) => {
        this.leadsPresent = res.leads.trainerLeads.length > 0;
      });
    } else {
      this.store.dispatch(new ReadLead()).subscribe((res) => {
        this.leadsPresent = res.leads.leads.length > 0;
      });
    }
  }

  deleteLead(id: number) {
    this.store.dispatch(new DeleteLead(id));
  }

  editLead(payload: Lead) {
    this.store.dispatch(new SetSelectedLead(payload));
  }

  onCreateSelect(): void {
    this.dialogService.open(AddLeadComponent);
  }

  onViewSelect(): void {
    this.dialogService.open(ShowLeadComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onEditSelect(): void {
    this.dialogService.open(EditLeadComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onAddAsClient() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create client!'
    }).then((result) => {
      if (result.value) {
        delete this.selectedData.id;
        this.selectedData.status = 'Member';
        this.selectedData.createMember = true;
        this.store.dispatch(new UpdateLead({ ...this.selectedData}, Number(this.selected))).subscribe(() => {
          this.store.dispatch(new ReadLead());
          const payload = this.selectedData;
          this.router.navigate(['/pages/clients/view'], {state: { data: payload }});
        });
        /*Swal.fire(
          'Creating Client!',
          'Your file has been deleted.',
          'success'
        )*/
      }
    })
  }

  onSelected(event): void {
    if (event.isSelected)
      this.selected = event.data.id;
      this.selectedData = event.data;
  }

}
