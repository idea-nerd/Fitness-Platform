import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeSubscriptionComponent } from './freeze-subscription.component';

describe('FreezeSubscriptionComponent', () => {
  let component: FreezeSubscriptionComponent;
  let fixture: ComponentFixture<FreezeSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezeSubscriptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
