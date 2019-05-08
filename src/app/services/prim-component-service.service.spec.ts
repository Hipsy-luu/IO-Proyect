import { TestBed } from '@angular/core/testing';

import { PrimComponentServiceService } from './prim-component-service.service';

describe('PrimComponentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimComponentServiceService = TestBed.get(PrimComponentServiceService);
    expect(service).toBeTruthy();
  });
});
