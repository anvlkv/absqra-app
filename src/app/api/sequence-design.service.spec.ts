import { TestBed, inject } from '@angular/core/testing';

import { SequenceDesignService } from './sequence-design.service';
import { GeneralDataService } from './general-data.service';
import { XHRBackend, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SequenceDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        GeneralDataService,
        SequenceDesignService
      ]
    });
  });

  it('should be created', inject([SequenceDesignService], (service: SequenceDesignService) => {
    expect(service).toBeTruthy();
  }));
});
