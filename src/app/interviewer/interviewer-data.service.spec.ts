import { TestBed, inject } from '@angular/core/testing';

import { InterviewerDataService } from './interviewer-data.service';

describe('InterviewerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewerDataService]
    });
  });

  it('should be created', inject([InterviewerDataService], (service: InterviewerDataService) => {
    expect(service).toBeTruthy();
  }));
});
