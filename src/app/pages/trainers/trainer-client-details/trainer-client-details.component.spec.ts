import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientDetailsComponent } from './trainer-client-details.component';

describe('TrainerClientDetailsComponent', () => {
  let component: TrainerClientDetailsComponent;
  let fixture: ComponentFixture<TrainerClientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientDetailsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
