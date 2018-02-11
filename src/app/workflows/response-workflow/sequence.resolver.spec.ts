import { TestBed, async, inject } from '@angular/core/testing';

import { SequenceResolver } from './sequence.resolver';
import { ResponseService } from '../../api/response.service';
import { instance, mock } from 'ts-mockito';

describe('SequenceResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ResponseService, useValue: instance(ResponseService)},
        SequenceResolver
      ]
    });
  });

  it('should ...', inject([SequenceResolver], (guard: SequenceResolver) => {
    expect(guard).toBeTruthy();
  }));
});
