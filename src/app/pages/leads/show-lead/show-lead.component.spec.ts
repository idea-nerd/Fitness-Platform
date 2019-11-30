import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLeadComponent } from './show-lead.component';

describe('ShowLeadComponent', () => {
  let component: ShowLeadComponent;
  let fixture: ComponentFixture<ShowLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLeadComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
