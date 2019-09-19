import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBoundPage } from './branch-bound.page';

describe('BranchBoundPage', () => {
  let component: BranchBoundPage;
  let fixture: ComponentFixture<BranchBoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchBoundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchBoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
