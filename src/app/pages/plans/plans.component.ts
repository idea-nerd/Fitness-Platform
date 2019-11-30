import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-plans',
  template:  `
    <router-outlet></router-outlet>
  `,
})
export class PlansComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
