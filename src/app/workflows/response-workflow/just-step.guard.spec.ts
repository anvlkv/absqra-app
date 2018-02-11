import { TestBed, async, inject } from '@angular/core/testing';

import { JustStepGuard } from './just-step.guard';
import { ResponseService } from '../../api/response.service';
import { GeneralDataService } from '../../api/general-data.service';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('JustStepGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        GeneralDataService,
        ResponseService,
        JustStepGuard,

      ]
    });
  });

  it('should ...', async(inject([JustStepGuard], (guard: JustStepGuard) => {
    expect(guard).toBeTruthy();
  })));
});
