import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent {
  @Input() profit: any;
  @Input() profitPercent: any;
  @Input() profitMargin: any;
  @Input() subscriptions: any;
  @Input() subscriptionPercent: any;
  @Input() subscriptionMargin: any;
  @Input() clients: any;
  @Input() clientsPercent: any;
  @Input() clientsMargin: any;

  item: any = {};
  
  constructor() { }

}
