import { TestBed, inject } from '@angular/core/testing';

import { ItemDesignService } from './item-design.service';

describe('ItemDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemDesignService]
    });
  });

  it('should be created', inject([ItemDesignService], (service: ItemDesignService) => {
    expect(service).toBeTruthy();
  }));
});
