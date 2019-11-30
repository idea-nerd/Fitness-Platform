import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientComponent } from './show-client.component';

describe('ShowClientComponent', () => {
  let component: ShowClientComponent;
  let fixture: ComponentFixture<ShowClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowClientComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
