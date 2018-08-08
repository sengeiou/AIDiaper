import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import {AppBase} from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage  extends AppBase {
  @ViewChild("myslider") myslider: Slides;
  devicelist=[];
  constructor(public navCtrl: NavController,public modalCtrl:ModalController 
    , public statusBar : StatusBar,public viewCtrl:ViewController,private localNotifications: LocalNotifications
    ,private ble: BLE,private bluetoothSerial: BluetoothSerial
  ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
  }
  
  onMyShow(){

    if(AppBase.IsMobileWeb){

      this.myslider.stopAutoplay();
      this.devicelist.push({id:"test:test:test:test",advertising:{},riis:100,data:"~~~"});
      this.myslider.slideNext();

    }else{
      if(this.ble.isEnabled){
        this.tryScan();
      }else{
        var that=this;
        this.ble.enable().then(()=>{
          that.tryScan();
        });
      }
    }
  }
  tryScan(){
    this.ble.startScan([]).subscribe((device) => {
          
      if(device.name!=undefined&&device.name==" LN-200c"){
       device.data=JSON.stringify(device);

       this.devicelist.push(device);
       this.myslider.slideTo(1);
       this.ble.stopScan();
       //this.close(device);
      }
      
    },(error)=>{
      alert(error);
    },()=>{
    });
  }
  selectDevice(device){
    this.close(device);
  }
}