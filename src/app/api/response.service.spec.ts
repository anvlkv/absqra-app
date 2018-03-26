import { TestBed, inject } from '@angular/core/testing';

import { ResponseService } from './response.service';
import { GeneralDataService } from './general-data.service';
import { XHRBackend, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        GeneralDataService,
        ResponseService
      ]
    });
  });

  it('should be created', inject([ResponseService], (service: ResponseService) => {
    expect(service).toBeTruthy();
  }));
});
