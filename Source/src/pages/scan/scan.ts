import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import {AppBase} from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage  extends AppBase {
  @ViewChild("myslider") myslider: Slides;
  devicelist=[];
  selectdeviceid="";
  constructor(public navCtrl: NavController,public modalCtrl:ModalController 
    , public statusBar : StatusBar,public viewCtrl:ViewController,private localNotifications: LocalNotifications
    ,private ble: BLE
  ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
  }
  
  onMyShow(){

    if(AppBase.IsMobileWeb){

      this.myslider.stopAutoplay();
      this.devicelist.push({name:"test",id:"test:test:test:test",advertising:{},riis:100,data:"~~~"});
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

    try{
      AppBase.Storage.get("selectdeviceid").then((id)=>{
        this.selectdeviceid=id;
      });
    }catch(ex){

    }
  }
  tryScan(){
    this.ble.startScanWithOptions([], { reportDuplicates: false }).subscribe((device) => {


      if(device.name!=undefined&&device.name==" LN-200c"&&device.advertising != undefined){
      if(AppBase.research==false&&device.id==this.selectdeviceid){
        this.selectDevice(device);
      }
       device.data=JSON.stringify(device);
       var advertising=device.advertising;
       var scanRecord = device.advertising.split(",");
       device.clicked=scanRecord[14]!=0x00;
       var havedevice=false;
       for(var i=0;i<this.devicelist.length;i++){
         if(device.id==this.devicelist[i].id){
           this.devicelist[i]=device;
           havedevice=true;
           return;
         }
       }
       if(havedevice==false){
        this.devicelist.push(device);
       }
       this.devicelist.sort((a,b)=>{
        return parseInt(a.rssi)<parseInt(b.rssi)?1:-1;
       });
       
       this.myslider.slideTo(1);
       //this.ble.stopScan();
       //this.close(device);
      }
      
    },(error)=>{
      alert(error);
    },()=>{
    });
  }
  selectDevice(device){
    AppBase.research=false;
    AppBase.Storage.set("selectdeviceid",device.id);
    this.close(device);
  }
}