import { TestBed, inject } from '@angular/core/testing';

import { GeneralDataService } from './general-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';


describe('GeneralDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient,
        GeneralDataService
      ],
    });
  });

  it('should be created', inject([HttpClientTestingModule, GeneralDataService], (mockBackend, service: GeneralDataService) => {
    expect(service).toBeTruthy();
  }));
});
