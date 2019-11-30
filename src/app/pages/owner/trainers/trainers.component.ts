import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { User } from './../../../models/users.model';
import { UserState } from './../../../state/user.state';
import { Observable } from 'rxjs/Observable';
import { ReadTrainers } from './../../../actions/user.actions';

import { Settings } from './settings';
import { ReadTrainersClientCount } from '../../../actions/trainer.actions';

@Component({
  selector: 'ngx-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {

  @Select(UserState.getTrainers) users$: Observable<User>;

  source: LocalDataSource;
  settings: any = Settings;
  users: any = [];
  selected: string;

  trainerClients: string;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new ReadTrainers());
    this.store.dispatch(new ReadTrainersClientCount()).subscribe((res) => {
      this.trainerClients = res.trainers.trainerClients.trainerListDetails
      console.log('tes3', this.trainerClients)
    });
  }

}
