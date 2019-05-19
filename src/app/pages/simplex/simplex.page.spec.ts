import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplexPage } from './simplex.page';

describe('SimplexPage', () => {
  let component: SimplexPage;
  let fixture: ComponentFixture<SimplexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplexPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
