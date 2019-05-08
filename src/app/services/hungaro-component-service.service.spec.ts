import { TestBed } from '@angular/core/testing';

import { HungaroComponentServiceService } from './hungaro-component-service.service';

describe('HungaroComponentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HungaroComponentServiceService = TestBed.get(HungaroComponentServiceService);
    expect(service).toBeTruthy();
  });
});
