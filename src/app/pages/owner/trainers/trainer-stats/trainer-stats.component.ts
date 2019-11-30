import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-trainer-stats',
  templateUrl: './trainer-stats.component.html',
  styleUrls: ['./trainer-stats.component.scss']
})
export class TrainerStatsComponent implements OnInit {
  @Input() image: any;
  @Input() name: any;
  @Input() email: any;
  @Input() phone: any;
  @Input() role: any;
  @Input() count: any;
  constructor() { }

  ngOnInit() {
  }

}
