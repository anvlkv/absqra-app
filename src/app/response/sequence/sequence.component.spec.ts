import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SequenceComponent } from './sequence.component';
import { ResponseService } from '../../api/response.service';
import { instance, mock, verify, when } from 'ts-mockito';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { sequence } from '../../../fixtures/sequence.fixture';
import { ActivatedRoute } from '@angular/router';
import { ProgressComponent } from '../progress/progress.component';
import { ItemComponent } from '../item/item.component';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '../../inputs/inputs.module';

describe('SequenceComponent', () => {
  let component: SequenceComponent;
  let fixture: ComponentFixture<SequenceComponent>;
  const rsMock = mock(ResponseService);

  when(rsMock.set$sequence(1)).thenReturn(Observable.of(sequence));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SequenceComponent,
        ProgressComponent,
        ItemComponent,
      ],
      imports: [
        FormsModule,
        InputsModule
      ],
      providers: [
        {
          provide: ResponseService,
          useValue: instance(rsMock)
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({sequenceId: 1})
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set sequence', async(() => {
    verify(rsMock.set$sequence(1)).called();
    expect(component.sequence).toEqual(sequence);
  }));

  it('should show progress', () => {
    expect(fixture.nativeElement.querySelector('app-progress')).toBeTruthy();
  });

  it('should show item', () => {
    expect(fixture.nativeElement.querySelector('app-item')).toBeTruthy();
  });
});
