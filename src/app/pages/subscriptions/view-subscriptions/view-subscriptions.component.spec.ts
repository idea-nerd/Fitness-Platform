import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriptionsComponent } from './view-subscriptions.component';

describe('ViewSubscriptionsComponent', () => {
  let component: ViewSubscriptionsComponent;
  let fixture: ComponentFixture<ViewSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubscriptionsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
