import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { instance, mock } from 'ts-mockito';

describe('DataService', () => {
  const mockedApi: ApiService = mock(ApiService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        {provide: ApiService, useFactory: () => instance(mockedApi) }
      ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
