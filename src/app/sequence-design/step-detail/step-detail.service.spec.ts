import { TestBed } from '@angular/core/testing';

import { StepDetailService } from './step-detail.service';

describe('StepDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepDetailService = TestBed.get(StepDetailService);
    expect(service).toBeTruthy();
  });
});
