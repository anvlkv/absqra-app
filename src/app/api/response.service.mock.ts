import { mock, when } from 'ts-mockito';
import { ResponseService } from './response.service';
import { Observable } from 'rxjs/Observable';
import { sequence } from '../../fixtures/sequence.fixture';

export function mockResponseService (): ResponseService {
  const mockService: any = mock<ResponseService>(ResponseService);
  const step = sequence.steps[0];

  when(mockService.set$sequence(1)).thenReturn(Observable.of(sequence));
  when(mockService.nextStep()).thenReturn(Observable.of(step), Observable.of(sequence.steps[1]));
  when(mockService.getStep()).thenReturn(Observable.of(step));

  return mockService;
}

