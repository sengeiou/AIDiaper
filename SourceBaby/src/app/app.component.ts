import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AppBase } from './app.base';
import { Storage } from '@ionic/storage';
import { AppUpdate } from '@ionic-native/app-update';
import { AppLang } from './app.lang';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage, appUpdate: AppUpdate) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log(platform);
      try {
        //appUpdate.checkAppUpdate("http://cmsdev.app-link.org/alucard263096/aidiaper/api/apkupdate/version").then(
        //(ret)=>{
        //alert(JSON.stringify(ret));
        //}
        //);
      } catch (e) {
        //alert(JSON.stringify(e));
      }

      AppBase.IsIos = platform.is("ios");;
      AppBase.IsAndroid = platform.is("android");
      AppBase.IsMobileWeb = platform.is("mobileweb");
      AppBase.Storage = storage;
      

    });
  }
}
