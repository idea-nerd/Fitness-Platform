import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-trainers',
  template:  `
    <router-outlet></router-outlet>
  `,
})
export class TrainersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
