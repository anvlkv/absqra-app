import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ComponentFixture } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Deferred, defer } from 'q';
import { HttpClientModule } from '@angular/common/http';


let fixture: ComponentFixture<AppComponent>;
let app: AppComponent;

class MockGeneralDataService {
  public ready: Q.Promise<any>;

  private readyDef: Deferred<any> = defer();
  constructor() {
    this.ready = this.readyDef.promise;
  }

  initApi() {
    this.readyDef.resolve(true);
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        Title
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
});
