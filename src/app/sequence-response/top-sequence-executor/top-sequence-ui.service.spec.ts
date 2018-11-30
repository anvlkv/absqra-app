import { TestBed } from '@angular/core/testing';

import { TopSequenceUIService } from './top-sequence-ui.service';

describe('TopSequenceUIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopSequenceUIService = TestBed.get(TopSequenceUIService);
    expect(service).toBeTruthy();
  });
});
