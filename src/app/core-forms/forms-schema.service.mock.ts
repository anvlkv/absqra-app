import { mock, when } from 'ts-mockito';
// import { sequence } from '../../fixtures/sequence.fixture';
import { Observable } from 'rxjs/Observable';
import { ResponseService } from '../api/response.service';
import { FormConfig, FormsSchemaService } from './forms-schema.service';
import { FormBuilder, FormGroup } from '@angular/forms';


export function mockFormsSchemaService (): FormsSchemaService {

  const mockService: any = mock<FormsSchemaService>(FormsSchemaService);
  // const step = sequence.steps[0];

  // when(mockService.).thenReturn(Observable.of(sequence));
  // when(mockService.nextStep()).thenReturn(Observable.of(step), Observable.of(sequence.steps[1]));
  // when(mockService.getStep()).thenReturn(Observable.of(step));
  const fb = new FormBuilder();

  when(mockService.getFg('nothing')).thenReturn(Observable.of(fb.group({})));
  when(mockService.getFg('radios')).thenReturn(Observable.of(fb.group({'question': fb.control(null)})));
  when(mockService.getFg('checkboxes')).thenReturn(Observable.of(fb.group({'question':
      fb.group({
      'a1': fb.control(false),
      'a2': fb.control(false)
    }
    )})));
  when(mockService.getFg('list')).thenReturn(Observable.of(fb.group({/*'question': fb.array([])*/})));
  when(mockService.getFg('y/n')).thenReturn(Observable.of(fb.group({/*'question': fb.control(false)*/})));
  when(mockService.getFg()).thenReturn(Observable.of(fb.group({'question': fb.control('')})));


  when(mockService.getConfig('nothing')).thenReturn(Observable.of(<FormConfig>{name: '', inputs: []}));
  when(mockService.getConfig('radios')).thenReturn(Observable.of(<FormConfig>{name: '', inputs: [
      {
        type: 'select-single',
        value: {
          inputs: [
            {
              type: 'radio',
              name: 'question',
              value: 'a1',
              required: false
            },
            {
              type: 'radio',
              name: 'question',
              value: 'a2',
              required: false
            }
          ]
        }
      }
    ]}));
  when(mockService.getConfig('checkboxes')).thenReturn(Observable.of(<FormConfig> {
    'inputs': [
      {
        'type': 'select-multiple',
        'name': 'question',
        'required': false,
        'value': {
          'inputs': [
            {
              'type': 'checkbox',
              'name': 'a1',
              'value': false
            },
            {
              'type': 'checkbox',
              'name': 'a2',
              'value': false
            }
          ]
        }
      }
    ]
  }));
  when(mockService.getConfig('list')).thenReturn(Observable.of(<FormConfig>{name: 'question', inputs: [
      {
        type: 'list-input'
      }
    ]}));
  when(mockService.getConfig('y/n')).thenReturn(Observable.of(<FormConfig>{name: 'question', inputs: [
      {
        type: 'yes-no'
      }
    ]}));

  when(mockService.getConfig()).thenReturn(Observable.of(<FormConfig>{inputs: [{type: 'text', name: 'question'}]}));

  return mockService;
}
