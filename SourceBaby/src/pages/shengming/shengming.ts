import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App,ModalController,ViewController } from 'ionic-angular';
import {AppBase} from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the ShengmingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-shengming',
  templateUrl: 'shengming.html',
})
export class ShengmingPage  extends AppBase { 
  
  constructor(public navCtrl: NavController,public modalCtrl:ModalController 
    , public statusBar : StatusBar,public viewCtrl:ViewController
  ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
  }


}
