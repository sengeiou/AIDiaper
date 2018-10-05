import { Component } from '@angular/core';
import { NavController,ModalController, ViewController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MallPage } from '../mall/mall';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { AppLang } from '../../app/app.lang';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage  extends AppBase {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = MallPage;

  constructor(public navCtrl: NavController,public modalCtrl:ModalController 
    , public statusBar : StatusBar,public viewCtrl:ViewController
  ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
  }
  onMyShow(){
    this.Lang=AppLang.getLang(AppBase.Setting.lang);
  }
  reloadlang(){
    //alert(1);
    this.Lang=AppLang.Lang; 
  }
}
