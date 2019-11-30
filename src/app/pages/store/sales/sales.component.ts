import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sales',
  template:  `
    <router-outlet></router-outlet>
  `,
})
export class SalesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
