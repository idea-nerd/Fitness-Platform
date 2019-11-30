import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-services',
  template:  `
    <router-outlet></router-outlet>
  `,
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
