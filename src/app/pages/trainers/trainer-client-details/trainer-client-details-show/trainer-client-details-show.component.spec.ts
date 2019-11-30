import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientDetailsShowComponent } from './trainer-client-details-show.component';

describe('TrainerClientDetailsShowComponent', () => {
  let component: TrainerClientDetailsShowComponent;
  let fixture: ComponentFixture<TrainerClientDetailsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientDetailsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientDetailsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
