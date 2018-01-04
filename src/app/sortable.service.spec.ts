import { TestBed, inject } from '@angular/core/testing';

import { SortableService } from './sortable.service';

describe('SortableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortableService]
    });
  });

  it('should be created', inject([SortableService], (service: SortableService) => {
    expect(service).toBeTruthy();
  }));
});
