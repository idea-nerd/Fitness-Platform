import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientDetailsEditComponent } from './trainer-client-details-edit.component';

describe('TrainerClientDetailsEditComponent', () => {
  let component: TrainerClientDetailsEditComponent;
  let fixture: ComponentFixture<TrainerClientDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
