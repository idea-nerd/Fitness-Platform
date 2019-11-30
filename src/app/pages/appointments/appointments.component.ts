import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-appointments',
  template:  `
    <router-outlet></router-outlet>
  `,
})
export class AppointmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
