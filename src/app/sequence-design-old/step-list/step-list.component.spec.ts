import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepListComponent } from './step-list.component';
import { AppCommonModule } from '../../app-common/app-common.module';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '../../inputs/inputs.module';
import { StepDetailComponent } from '../step-detail/step-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { instance, mock } from 'ts-mockito';
import { DataService } from '../../app-common/data.service';

describe('StepListComponent', () => {
  let component: StepListComponent;
  let fixture: ComponentFixture<StepListComponent>;
  const dataMock = mock(DataService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepListComponent,
      ],
      imports: [
        FormsModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: DataService,
          useFactory: () => instance(dataMock)
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
