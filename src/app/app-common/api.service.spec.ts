import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { instance, mock, when } from 'ts-mockito';

describe('ApiService', () => {
  const cookieMock: CookieService = mock(CookieService);

  when(cookieMock.get('API-URL')).thenReturn('http://api.com');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        {provide: CookieService, useFactory: () => instance(cookieMock)}
      ]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
