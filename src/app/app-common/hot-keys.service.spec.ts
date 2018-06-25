import { TestBed, inject } from '@angular/core/testing';

import { HotKeysService } from './hot-keys.service';

describe('HotKeysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotKeysService]
    });
  });

  it('should be created', inject([HotKeysService], (service: HotKeysService) => {
    expect(service).toBeTruthy();
  }));
});
