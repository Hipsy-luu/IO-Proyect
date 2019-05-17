import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawGraphPage } from './draw-graph.page';

describe('DrawGraphPage', () => {
  let component: DrawGraphPage;
  let fixture: ComponentFixture<DrawGraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawGraphPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawGraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
