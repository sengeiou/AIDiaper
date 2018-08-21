import { Component } from '@angular/core';
import { NavController,ModalController, ViewController } from 'ionic-angular';
import {AppBase} from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage extends AppBase {
  
  constructor(public navCtrl: NavController,public modalCtrl:ModalController 
    , public statusBar : StatusBar,public viewCtrl:ViewController
  ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
  }
  selectAlert(e){
    AppBase.Storage.set("setting_alert",this.setting.alert);
  }
  selectSound(e){
    AppBase.Storage.set("setting_sound",this.setting.sound);
  }
  selectShushi(e){
    AppBase.Storage.set("setting_shushi",this.setting.shushi);
  }
  selectMashu(e){
    AppBase.Storage.set("setting_mashu",this.setting.mashu);
  }
  selectFanshen(e){
    AppBase.Storage.set("setting_fanshen",this.setting.fanshen);
  }
  rescan(){
    AppBase.research=true;
    this.modal("ScanPage",{},(selectdevice)=>{
      if(selectdevice!=undefined){
        this.changeTab(0,null);
      }
    });
  }
}
