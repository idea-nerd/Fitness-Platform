import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-owner',
  template:  `
    <router-outlet></router-outlet>
  `,
})
export class OwnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
