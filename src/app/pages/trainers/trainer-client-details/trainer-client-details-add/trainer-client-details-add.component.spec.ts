import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientDetailsAddComponent } from './trainer-client-details-add.component';

describe('TrainerClientDetailsAddComponent', () => {
  let component: TrainerClientDetailsAddComponent;
  let fixture: ComponentFixture<TrainerClientDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
