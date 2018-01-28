import { TestBed, inject } from '@angular/core/testing';

import { AssetDesignService } from './asset-design.service';

describe('AssetDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [AssetDesignService]
    });
  });

  it('should be created', inject([AssetDesignService], (service: AssetDesignService) => {
    expect(service).toBeTruthy();
  }));
});
