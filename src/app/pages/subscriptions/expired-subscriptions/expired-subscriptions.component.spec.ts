import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredSubscriptionsComponent } from './expired-subscriptions.component';

describe('ExpiredSubscriptionsComponent', () => {
  let component: ExpiredSubscriptionsComponent;
  let fixture: ComponentFixture<ExpiredSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
