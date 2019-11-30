import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewSubscriptionComponent } from './renew-subscription.component';

describe('RenewSubscriptionComponent', () => {
  let component: RenewSubscriptionComponent;
  let fixture: ComponentFixture<RenewSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewSubscriptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
