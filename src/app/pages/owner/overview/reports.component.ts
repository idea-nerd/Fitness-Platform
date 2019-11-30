import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

tabs = [
  {
    title: 'Revenue',
    route: '/pages/owners/reports/revenue',
    responsive: true,
  },
  /*{
    title: 'Trainers',
    route: '/pages/owners/reports/trainers',
    responsive: true,
  },*/
  {
    title: 'Clients',
    route: '/pages/owners/reports/clients',
    responsive: true,
  },
  {
    title: 'Subscriptions',
    route: '/pages/owners/reports/subscriptions',
    responsive: true,
  },
  /*{
    title: 'Products',
    route: '/pages/owners/reports/products',
    responsive: true,
  },*/
];

constructor() { }

ngOnInit() { }

}
