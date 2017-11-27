import { TestBed, inject } from '@angular/core/testing';

import { SequenceDesignService } from './sequence-design.service';

describe('SequenceDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SequenceDesignService]
    });
  });

  it('should be created', inject([SequenceDesignService], (service: SequenceDesignService) => {
    expect(service).toBeTruthy();
  }));
});
