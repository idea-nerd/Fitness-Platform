import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSaleComponent } from './show-sale.component';

describe('ShowSaleComponent', () => {
  let component: ShowSaleComponent;
  let fixture: ComponentFixture<ShowSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSaleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
