import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HungaroPage } from './hungaro.page';

describe('HungaroPage', () => {
  let component: HungaroPage;
  let fixture: ComponentFixture<HungaroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HungaroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HungaroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
