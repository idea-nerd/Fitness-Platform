import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfreezeSubscriptionComponent } from './unfreeze-subscription.component';

describe('UnfreezeSubscriptionComponent', () => {
  let component: UnfreezeSubscriptionComponent;
  let fixture: ComponentFixture<UnfreezeSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfreezeSubscriptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfreezeSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
