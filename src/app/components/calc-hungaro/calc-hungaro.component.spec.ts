import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcHungaroComponent } from './calc-hungaro.component';

describe('CalcHungaroComponent', () => {
  let component: CalcHungaroComponent;
  let fixture: ComponentFixture<CalcHungaroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcHungaroComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcHungaroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
