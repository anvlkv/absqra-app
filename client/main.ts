import 'angular2-meteor-polyfills';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './imports/app/app.module';
/**
 * Created by a.nvlkv on 19/11/2016.
 */
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);