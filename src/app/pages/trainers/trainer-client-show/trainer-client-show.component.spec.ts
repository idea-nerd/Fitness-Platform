import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientShowComponent } from './trainer-client-show.component';

describe('TrainerClientShowComponent', () => {
  let component: TrainerClientShowComponent;
  let fixture: ComponentFixture<TrainerClientShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
