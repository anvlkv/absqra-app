import { TestBed, inject } from '@angular/core/testing';

import { ResponseService } from './response.service';
import { GeneralDataService } from './general-data.service';
import { XHRBackend, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


describe('ResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        GeneralDataService,
        ResponseService
      ]
    });
  });

  it('should be created', inject([ResponseService], (service: ResponseService) => {
    expect(service).toBeTruthy();
  }));
});
