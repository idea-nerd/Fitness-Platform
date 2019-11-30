import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-products',
  template:  `
    <router-outlet></router-outlet>
  `,
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
