import { Component } from '@angular/core';
import { NavController,ModalController, ViewController } from 'ionic-angular';
import {AppBase} from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { ShengmingPage } from '../shengming/shengming';
import { AppLang } from '../../app/app.lang';

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
    localStorage.setItem("setting_alert",this.setting.alert);
  }
  selectSound(e){
    localStorage.setItem("setting_sound",this.setting.sound);
  }
  selectShushi(e){
    localStorage.setItem("setting_shushi",this.setting.shushi);
  }
  selectMashu(e){
    //alert(this.setting.mashu);
    localStorage.setItem("setting_mashu",this.setting.mashu);
  }
  selectFanshen(e){
    //alert(this.setting.fanshen);
    localStorage.setItem("setting_fanshen",this.setting.fanshen);
  }
  selectLang(e){
    localStorage.setItem("setting_lang",this.setting.lang);
    
    AppLang.getLang(this.setting.lang);
    this.Lang=AppLang.Lang;
  }
  onMyLoad(){

  }
  onMyShow(){

  }
  rescan(){
    AppBase.research=true;
    this.modal("ScanPage",{},(selectdevice)=>{
      if(selectdevice!=undefined){
        this.changeTab(0,null);
      }
    });
  }
  gotosehngming(){
    this.navCtrl.push(ShengmingPage);
  }
}
