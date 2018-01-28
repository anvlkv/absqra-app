import { TestBed, inject } from '@angular/core/testing';

import { GeneralDataService } from './general-data.service';
import { XHRBackend, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


describe('GeneralDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        GeneralDataService,
      ],
    });
  });

  it('should be created', inject([XHRBackend, GeneralDataService], (mockBackend, service: GeneralDataService) => {
    expect(service).toBeTruthy();
  }));
});
