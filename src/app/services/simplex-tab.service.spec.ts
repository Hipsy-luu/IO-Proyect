import { TestBed } from '@angular/core/testing';

import { SimplexTabService } from './simplex-tab.service';

describe('SimplexTabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimplexTabService = TestBed.get(SimplexTabService);
    expect(service).toBeTruthy();
  });
});
