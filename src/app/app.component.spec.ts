import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
// import { ApiModule } from './api/api.module';
import { GeneralDataService } from './api/general-data.service';
import { ComponentFixture } from '@angular/core/testing';
import { XHRBackend, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Title } from '@angular/platform-browser';
import { Deferred, defer } from 'q';
import { tick } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';


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
        HttpModule,
      ],
      providers: [
        Title,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: GeneralDataService, useClass: MockGeneralDataService},
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title '...loading'`, async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    const title = TestBed.get(Title);
    expect(title.getTitle()).toEqual('...loading');
  }));

  it(`should set title 'Intervey' when api is ready`, fakeAsync(inject([GeneralDataService], async (api: GeneralDataService) => {
    const title = TestBed.get(Title);
    expect(title.getTitle()).toEqual('...loading');
    // spyOn(api, 'initApi').and.returnValue(Promise.resolve(true));
    api.initApi();

    await app.ngOnInit();
    // fixture.detectChanges();

    // tick(500);
    fixture.detectChanges();

    expect(title.getTitle()).toEqual('Intervey');
    // api.resolve(true);
    //
    // fixture.detectChanges();
    // fixture.whenStable().then(() => {
    //
    // });

  })));
  //
  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Intervey');
  }));
});
