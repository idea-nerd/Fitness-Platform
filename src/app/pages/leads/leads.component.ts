import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-leads',
  template:  `
    <router-outlet></router-outlet>
  `,
})
export class LeadsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
