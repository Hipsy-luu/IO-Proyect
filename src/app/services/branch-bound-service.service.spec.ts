import { TestBed } from '@angular/core/testing';

import { BranchBoundServiceService } from './branch-bound-service.service';

describe('BranchBoundServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchBoundServiceService = TestBed.get(BranchBoundServiceService);
    expect(service).toBeTruthy();
  });
});
