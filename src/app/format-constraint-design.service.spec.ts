import { TestBed, inject } from '@angular/core/testing';

import { FormatConstraintDesignService } from './format-constraint-design.service';

describe('FormatConstraintDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatConstraintDesignService]
    });
  });

  it('should be created', inject([FormatConstraintDesignService], (service: FormatConstraintDesignService) => {
    expect(service).toBeTruthy();
  }));
});
