import { Component } from '@angular/core';
import { NavController,ModalController, ViewController } from 'ionic-angular';
import {AppBase} from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage extends AppBase {
  
  constructor(public navCtrl: NavController,public modalCtrl:ModalController 
    , public statusBar : StatusBar,public viewCtrl:ViewController
  ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
  }

}