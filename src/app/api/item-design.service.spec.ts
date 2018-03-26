import { TestBed, inject } from '@angular/core/testing';

import { ItemDesignService } from './item-design.service';
import { GeneralDataService } from './general-data.service';
import { SequenceDesignService } from './sequence-design.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ItemDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
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
