import { TestBed, inject } from '@angular/core/testing';

import { ItemDesignService } from './item-design.service';
import { GeneralDataService } from './general-data.service';
import { SequenceDesignService } from './sequence-design.service';
import { XHRBackend, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


describe('ItemDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        GeneralDataService,
        SequenceDesignService,
        ItemDesignService,
      ],
    });
  });

  it('should be created', inject([ItemDesignService], (service: ItemDesignService) => {
    expect(service).toBeTruthy();
  }));
});
