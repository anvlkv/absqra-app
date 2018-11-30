import { TestBed } from '@angular/core/testing';

import { SequenceDetailService } from './sequence-detail.service';

describe('SequenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SequenceDetailService = TestBed.get(SequenceDetailService);
    expect(service).toBeTruthy();
  });
});
