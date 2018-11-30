import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailComponent } from './asset-detail.component';
import { anything, instance, mock, when } from 'ts-mockito';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../app-common/api-service/api.service';
import { AssetPurposes } from './asset-detail.service';


describe('AssetDetailComponent', () => {
  let mockedData: ApiService;
  let component: AssetDetailComponent;
  let fixture: ComponentFixture<AssetDetailComponent>;

  beforeEach(async(() => {
    mockedData = mock(ApiService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: 1}));
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        AssetDetailComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        FormBuilder,
        {
          provide: ApiService,
          useFactory: () => instance(mockedData)
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssetDetailComponent);
    component = fixture.componentInstance;
    component.assetPurposeType = AssetPurposes.QUESTION;
    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});

