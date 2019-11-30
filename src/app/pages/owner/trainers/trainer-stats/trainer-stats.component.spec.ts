import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerStatsComponent } from './trainer-stats.component';

describe('TrainerStatsComponent', () => {
  let component: TrainerStatsComponent;
  let fixture: ComponentFixture<TrainerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
