import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcNortcornerComponent } from './calc-nortcorner.component';

describe('CalcNortcornerComponent', () => {
  let component: CalcNortcornerComponent;
  let fixture: ComponentFixture<CalcNortcornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcNortcornerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcNortcornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
