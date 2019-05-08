import { TestBed } from '@angular/core/testing';

import { NortcornerComponentServiceService } from './nortcorner-component-service.service';

describe('NortcornerComponentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NortcornerComponentServiceService = TestBed.get(NortcornerComponentServiceService);
    expect(service).toBeTruthy();
  });
});
