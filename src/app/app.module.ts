import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicImageLoader } from 'ionic-image-loader';

import { MyApp } from './app.component';

import { HttpProvider } from '../providers/http/http';
import { HttpInterceptorProvider } from '../providers/http-interceptor/http-interceptor';
import { StorageProvider } from '../providers/storage/storage';
import { UserProvider } from '../providers/user/user';
import { EvaluateProvider } from '../providers/evaluate/evaluate';
import { DailyProvider } from '../providers/daily/daily';
import { SignProvider } from '../providers/sign/sign';
import { ImpressionProvider } from '../providers/impression/impression';
import { DateUtilProvider } from '../providers/date-util/date-util';
import { WorkProvider } from '../providers/work/work';
import { AddresslistProvider } from '../providers/addresslist/addresslist';
import { ImageUtilProvider } from '../providers/image-util/image-util';
import { DynamicProvider } from '../providers/dynamic/dynamic';
import { ArrayUtilProvider } from '../providers/array-util/array-util';
import { IonicUtilProvider } from '../providers/ionic-util/ionic-util';
import { UnitProvider } from '../providers/unit/unit';

// import * as Test from '../test/mock';
// Test;
import * as VConsole from 'vconsole';
new VConsole();

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon:'md-fanhui'
    }),
    IonicImageLoader.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    File,
    Camera,
    ImagePicker,
    Base64,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorProvider, multi: true},
    HttpProvider,
    StorageProvider,
    UserProvider,
    EvaluateProvider,
    DailyProvider,
    SignProvider,
    ImpressionProvider,
    DateUtilProvider,
    AddresslistProvider,
    WorkProvider,
    ImageUtilProvider,
    DynamicProvider,
    ArrayUtilProvider,
    IonicUtilProvider,
    UnitProvider
  ]
})
export class AppModule {

}
