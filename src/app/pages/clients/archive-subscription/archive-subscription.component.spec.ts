import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveSubscriptionComponent } from './archive-subscription.component';

describe('ArchiveSubscriptionComponent', () => {
  let component: ArchiveSubscriptionComponent;
  let fixture: ComponentFixture<ArchiveSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveSubscriptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
