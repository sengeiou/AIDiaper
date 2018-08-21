import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BLE } from '@ionic-native/ble';
import { AIDevice } from './aidevice';
import { RecordApi } from '../../providers/record.api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[RecordApi]
})
export class HomePage extends AppBase {
  selectdeviceid="";

  mockdevice = {
    name: "4C:4E:54:00:00:47", id: "4C:4E:54:00:00:47", address: "4C:4E:54:00:00:47",
    advertising: "2,1,6,17,-1,76,78,84,0,0,71,56,-11,-111,1,21,2,84,45,4,-1,9,9,32,76,78,45,50,48,48,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
  };
  aidevice: AIDevice = new AIDevice();

  count=0;



  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, private localNotifications: LocalNotifications
    , private backgroundMode: BackgroundMode
    , public ble: BLE,public recordapi:RecordApi
  ) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar);

    this.aidevice.recordapi=recordapi;
  }

  onMyShow() {
    var that = this;
    this.aidevice.startTime();
    this.aidevice.setNotification(this.localNotifications);
    if(this.selectdeviceid==""){
      this.modal("ScanPage",{},(selectdevice)=>{
        //alert(selectdevice);
        this.selectdeviceid=selectdevice.id;
        this.tryScan();
      });
    }else{
      this.tryScan();
    }
    
    // AppBase.Storage.get("selectdeviceid").then((selectdeviceid)=>{
    //   this.selectdeviceid=selectdeviceid;
    // });

    //this.modal("ScanPage",{},(selectdevice)=>{
      //alert(1);
      //this.selectdeviceid=selectdevice.id;
      //
    //});


    this.backgroundMode.enable();
    
    
    // setTimeout(()=>{
    //   this.localNotifications.schedule({
    //     text:"aa"
    //   });
    // },5000);
  }
  tryScan() {
    //alert(this.device.advertising);
    if (AppBase.IsMobileWeb ) {
      this.aidevice.reloaddata(this.mockdevice.id, this.mockdevice.advertising);
      //alert(this.aidevice.Version);
    }
    else{
      try{
        this.ble.stopScan();
      }catch(e){

      }
      this.ble.startScanWithOptions([], { reportDuplicates: true }).subscribe((device) => {

        //if(this.selectdeviceid!=)

        if (device.name != undefined && device.name == " LN-200c"&&this.selectdeviceid==device.id) {
          //device.data = JSON.stringify(device);
          //this.ble.stopScan();
          //this.close(device);

          //alert(JSON.stringify(device.data));
          //this.tryConnect();
          
          if (device.advertising != undefined) {
            //alert(this.device.advertising);
            this.count++;
            this.aidevice.reloaddata(device.id, device.advertising);
            //alert(this.aidevice.Version);
          }
          //2.73.0
        }

      }, (error) => {
        alert(error);
      }, () => {
      });
    }

  }


  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  // ASCII only
  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }
}
