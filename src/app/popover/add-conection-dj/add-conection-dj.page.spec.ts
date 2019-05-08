import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConectionDjPage } from './add-conection-dj.page';

describe('AddConectionDjPage', () => {
  let component: AddConectionDjPage;
  let fixture: ComponentFixture<AddConectionDjPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConectionDjPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConectionDjPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
