import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AppBase } from './app.base';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,storage :Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log(platform);

      //appUpdate.checkAppUpdate("http://cmsdev.app-link.org/alucard263096/aidiaper/api/apkupdate/version");

      AppBase.IsIos=platform.is("ios");;
      AppBase.IsAndroid=platform.is("android");
      AppBase.IsMobileWeb=platform.is("mobileweb"); 
      AppBase.Storage=storage;

      storage.get("setting_alert").then(ret=>{

        if(ret==null){

          AppBase.Setting.alert="Y";
          storage.set("setting_alert","Y");
        }else{

          AppBase.Setting.alert=ret;
        }
      }).catch((e)=>{
      });

      storage.get("setting_sound").then(ret=>{

        if(ret==null){

          AppBase.Setting.sound="Y";
          storage.set("setting_sound","Y");
        }else{

          AppBase.Setting.sound=ret;
        }
      }).catch((e)=>{
      });


      storage.get("setting_shushi").then(ret=>{
        if(ret==null){

          AppBase.Setting.shushi="3";
          storage.set("setting_shushi","3");
        }else{

          AppBase.Setting.shushi=ret;
        }
      }).catch(()=>{
      });

      storage.get("setting_mashu").then(ret=>{
        if(ret==null){

          AppBase.Setting.mashu="1";
          storage.set("setting_mashu","1");
        }else{

          AppBase.Setting.mashu=ret;
        }
      }).catch(()=>{
      });

      storage.get("setting_fanshen").then(ret=>{
        if(ret==null){

          AppBase.Setting.mashu="1";
          storage.set("setting_fanshen","1");
        }else{

          AppBase.Setting.mashu=ret;
        }
      }).catch(()=>{
      });

    });
  }
}
