import { TestBed } from '@angular/core/testing';

import { DjistraComponentServiceService } from './djistra-component-service.service';

describe('DjistraComponentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DjistraComponentServiceService = TestBed.get(DjistraComponentServiceService);
    expect(service).toBeTruthy();
  });
});
