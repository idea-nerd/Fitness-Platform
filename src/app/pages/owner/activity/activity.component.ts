import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

tabs = [
    {
      title: 'New Registrations',
      route: '/pages/owners/activity/registration',
      responsive: true, // hide title before `route-tabs-icon-only-max-width` value
    },
    {
      title: 'Renewed Subscription',
      route: '/pages/owners/activity/subscription',
      responsive: true, // hide title before `route-tabs-icon-only-max-width` value
    },
    {
      title: 'Store Transaction',
      route: '/pages/owners/activity/store',
      responsive: true, // hide title before `route-tabs-icon-only-max-width` value
    }
];
   
constructor() { }

ngOnInit() { }

}
