import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BLE, BLEScanOptions } from '@ionic-native/ble';
import { AIDevice } from './aidevice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends AppBase {
  device = {
    name: "4C:4E:54:00:00:47", id: "4C:4E:54:00:00:47", address: "4C:4E:54:00:00:47",
    advertising: "2,1,6,17,-1,76,78,84,0,0,71,56,-11,-111,1,21,2,84,45,4,-1,9,9,32,76,78,45,50,48,48,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
  };
  aidevice: AIDevice = new AIDevice();

  count=0;



  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, private localNotifications: LocalNotifications
    , private backgroundMode: BackgroundMode
    , public ble: BLE
  ) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar);


  }

  onMyShow() {
    var that = this;
    this.aidevice.startTime();
    this.aidevice.setNotification(this.localNotifications);

    this.tryScan();
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
      this.aidevice.reloaddata(this.device.advertising);
      //alert(this.aidevice.Version);
    }
    else{
      this.ble.startScanWithOptions([], { reportDuplicates: true }).subscribe((device) => {

        if (device.name != undefined && device.name == " LN-200c") {
          device.data = JSON.stringify(device);
          //this.ble.stopScan();
          //this.close(device);
          this.device = device;
          //alert(JSON.stringify(device.data));
          //this.tryConnect();
          if (this.device.advertising != undefined) {
            //alert(this.device.advertising);
            this.count++;
            this.aidevice.reloaddata(this.device.advertising);
            //alert(this.aidevice.Version);
          }
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
