import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from "@angular/http";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { MallPage } from '../pages/mall/mall';
import { ShengmingPage } from '../pages/shengming/shengming';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BLE } from '@ionic-native/ble';
import { BackgroundMode } from '@ionic-native/background-mode';

import { IonicStorageModule } from '@ionic/storage';
import { RecordApi } from '../providers/record.api';
import { AppUpdate } from '@ionic-native/app-update';
import { SQLite } from '@ionic-native/sqlite';

import { NativeAudio } from '@ionic-native/native-audio';

enableProdMode();

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MallPage,
    ShengmingPage,
    TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:"",
      iconMode:"ios",
      modalEnter:"modal-slide-in",
      modalLeave:"modal-slide-out",
      tabsPlacement:"bottom",
      pageTransition:"ios",
      backButtonIcon:"ios-arrow-back",
      statusbarPadding:false
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MallPage,
    ShengmingPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    BLE,
    BackgroundMode,
    RecordApi,
    AppUpdate,
    SQLite,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
