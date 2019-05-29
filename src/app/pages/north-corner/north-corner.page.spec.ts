import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthCornerPage } from './north-corner.page';

describe('NorthCornerPage', () => {
  let component: NorthCornerPage;
  let fixture: ComponentFixture<NorthCornerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorthCornerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorthCornerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
