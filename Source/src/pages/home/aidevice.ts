import { AppBase } from "../../app/app.base";
import { DateTime } from "../../../node_modules/ionic-angular/umd";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DataMgr } from "./datamgr";

import { NativeAudio } from '@ionic-native/native-audio';
import { AppLang } from "../../app/app.lang";
import { BLE } from "@ionic-native/ble";

export class AIDevice {
    deviceid = "";
    db: DataMgr = null;

    advertising: String = "";
    isclick = false;
    lasttimespan = 0;
    usetime = "--";

    lastupdatetime = 0;


    Version = 0;
    scanRecord = [];
    mData = [];
    angleData = Array(3);

    VstepV = 0;
    greenYV = 4; //黄绿色触发值 相当于520
    redV = 30;//红色触发值 相当于400
    yellowV = 11;//黄色触发值
    orangeV = 22;//橙色触发值


    no = "";
    wetml = "0ml";
    ml = 0;
    wetval = "--";
    cval = "--";


    statuslist = [];
    disconnectstatus = { color: "#fcfcfc", name: "unconnec", idx: "", msg: "nodeviceconnect" };
    unclickstatus = { color: "#fcfcfc", name: "connect", idx: "", msg: "clickopenandchange" };
    currentstatus = { color: "#fcfcfc", name: "unconnec", idx: "" };

    temperature = "--";
    v0 = 0.0;
    battery = AppLang.Lang["unconnec"];
    post = "";
    postimg = "";
    nomovetime = "--";

    fall = "N";


    fan = "N";

    statusCheck = null;
    level = 0;
    displayC = 530;

    shushidu = 0;


    constructor() {
        this.statuslist.push({ color: "rgb(66,187,55)", name: "status_0", msg: "msg_0", v: 100, wet: 0 });
        this.statuslist.push({ color: "rgb(107,251,13)", name: "status_1" , msg: "msg_1", v: 75, wet: 1 });
        this.statuslist.push({ color: "rgb(255,255,11)", name: "status_2" , msg: "msg_2", v: 50, wet: 2 });
        this.statuslist.push({ color: "rgb(253,166,10)", name: "status_3" , msg: "msg_3", v: 25, wet: 3 });
        this.statuslist.push({ color: "rgb(250,0,63)", name: "status_4" , msg: "msg_4", v: 0, wet: 4 });

        this.currentstatus = this.disconnectstatus;
        this.lastupdatetime = (new Date).getTime() / 1000;


    }
    startTime() {
        var that = this;
        this.statusCheck = setInterval(() => {
            this.timerFunc();
        }, 1000);
    }
    sendunconnect = false;
    timerFunc() {
        var nowtime = (new Date()).getTime() / 1000;
        if (nowtime - this.lastupdatetime > 30) {
            this.cleardata();
            if (this.sendunconnect == false) {
                this.sendunconnect = true;
                this.notify(4, AppLang.Lang["havebeenunconnect"]);
                
            }
        }
        if (this.lasttimespan > 0) {
            var ts = parseInt((nowtime - this.lasttimespan).toFixed());
            if (ts < 60) {
                this.usetime = ts + AppLang.Lang["s"];
            } else if (60 <= ts && ts < 3600) {
                this.usetime = (ts / 60).toFixed() + AppLang.Lang["m"];
            } else {
                this.usetime = (ts / 3600).toFixed() + AppLang.Lang["h"];
                var lstminute = parseInt(((ts % 3600) / 60).toFixed());
                if (lstminute > 0) {
                    this.usetime += lstminute + AppLang.Lang["m"];
                }
            }
        }
    }
    cclick=false;
    reloaddata(deviceid, datastr: String) {
        this.deviceid = deviceid;
        try {
            var devcut = this.deviceid.split(":");
            this.no = devcut[devcut.length - 1];
        } catch (e) {
            this.no = "";
        }
        this.lastupdatetime = (new Date).getTime() / 1000;

        this.advertising = datastr;
        this.scanRecord = datastr.split(",");
        this.Version=AIDevice.GetVersion(this.scanRecord);

        var mlength = AIDevice.GetwholeDatelength(this.Version);
        if (this.scanRecord.length < mlength) {
            return;
        }

        if (this.Version == 0) {
            this.mData = Array(7);
        }
        else if (this.Version == 1) {
            this.mData = Array(7);
        }
        else if (this.Version == 2) {
            this.mData = Array(8);
        }
        //						mTimeOutHandler.removeCallbacks(mThreadTimeOut);
        //						runOnUiThread(capEnter);
        var mdataPosition = AIDevice.GetDataPosition(this.Version);
        for (var i = mdataPosition; i < (this.mData.length + mdataPosition); i++) {
            this.mData[i - mdataPosition] = this.scanRecord[i];
        }
        this.angleData[0] = this.scanRecord[mdataPosition - 3];
        this.angleData[1] = this.scanRecord[mdataPosition - 2];
        this.angleData[2] = this.scanRecord[mdataPosition - 1];

        //this.notify(0,"ceshi");

        if (this.mData[0] == 0x00 || this.mData[14] == 0x00) {
            //alert("??dakai");

            this.getWetness();
            if (this.isclick == true) {
                //this.recordapi.update({ mac: this.deviceid, op: "O", ml: this.ml, level: this.level, data: this.advertising }).then((ret) => {
                //    console.log(ret);
                //});
                this.db.addWetRecord(this.deviceid, 3, this.ml);
            }

            //this.db.addWetRecord(this.deviceid, 3, this.ml);
            this.isclick = false;
            this.lasttimespan = 0;
            this.displayC=530;
            this.cleardata();
            this.currentstatus = this.unclickstatus;
        } else {
            this.getWetness();
            if (this.isclick == false) {
                this.isclick = true;
                this.lasttimespan = (new Date()).getTime() / 1000;

                // this.recordapi.update({ mac: this.deviceid, op: "C", ml: this.ml, level: this.level, data: this.advertising }).then((ret) => {
                //    console.log(ret);
                //});
                //alert("?kazu");
                if(this.mData[0] == 0x03){
                    if(this.cclick==false){
                        this.db.addWetRecord(this.deviceid, 1, this.ml);
                        this.cclick=true;
                        setTimeout(()=>{
                            this.cclick=false;
                        },3000);
                    }

                }
            }

            this.sendunconnect = false;
            this.getSensetive();

            this.getTemperature();
            this.getBattery();
            this.getPost();
            this.checkFall();
        }

    }
    private getBattery() {
        var mData = this.mData;
        var v0 = 0.0;
        if (this.Version == 2) {
            v0 = ((200 + (mData[3] & 0xFF)));//
        }
        else {
            v0 = (((mData[2] & 0xFF) << 8) + (mData[1] & 0xFF)) / 1024 * 360;
        }
        this.v0 = v0 / 100.0;
        if (this.v0 <= 0) {
            this.battery = "已断开";
        } else if (this.v0 < 2) {
            this.battery = "低电量";
        } else {
            this.battery = "正常";
        }
    }

    private getTemperature() {
        var tempratureValue = 0.0;
        if (this.Version == 1) {

            tempratureValue = parseFloat(this.mData[7]);
            this.temperature = (23.0 + (tempratureValue / 2)).toFixed(1);
        } else if (this.Version == 2) {

            tempratureValue = this.mData[4] & 0xFF;
            this.temperature = (tempratureValue / 2).toFixed(1);
        }
    }

    static GetwholeDatelength(Version) {
        if (Version == 0)
            return 25;
        if (Version == 1)
            return 27;
        else
            return 31;
    }

    static GetDataPosition(Version) {
        if (Version == 0)
            return 18;
        if (Version == 1)
            return 9;
        if (Version == 2)
            return 14;
        else
            return 9;
    }

    static GetVersion(scanRecord) {
        if (scanRecord.length < 25 || scanRecord[0] != 0x02 || scanRecord[1] != 0x01 ||
            scanRecord[2] != 0x06 || scanRecord[3] != 0x03 || scanRecord[4] != 0x03 ||
            scanRecord[5] != 0x58 || scanRecord[6] != 0x69 || String.fromCharCode(scanRecord[9]) != 'L' ||
            String.fromCharCode(scanRecord[10]) != 'N' || String.fromCharCode(scanRecord[11]) != '-'
            || String.fromCharCode(scanRecord[12]) != '2' ||
            String.fromCharCode(scanRecord[13]) != '0' || String.fromCharCode(scanRecord[14]) != '0'
            || String.fromCharCode(scanRecord[15]) != 'N' ||
            scanRecord[18] == 0x00
        ) {

            if (scanRecord.length < 27 || scanRecord[0] != 0x02 || scanRecord[1] != 0x01 ||
                scanRecord[2] != 0x06 ||
                String.fromCharCode(scanRecord[5]) != 'S' || String.fromCharCode(scanRecord[6]) != 'A'
                || String.fromCharCode(scanRecord[7]) != 'N' || String.fromCharCode(scanRecord[8]) != ' ' || scanRecord[9] != 0x01
            ) {
                if (scanRecord.length < 31 || scanRecord[0] != 0x02 || scanRecord[1] != 0x01 ||
                    scanRecord[2] != 0x06

                    || scanRecord[14] != 0x1 ||

                    ((String.fromCharCode(scanRecord[5]) != 'S' || String.fromCharCode(scanRecord[6]) != 'A' ||
                        String.fromCharCode(scanRecord[7]) != 'N' ||
                        String.fromCharCode(scanRecord[23]) != 'S' ||
                        String.fromCharCode(scanRecord[24]) != 'W' || String.fromCharCode(scanRecord[25]) != 'L' ||
                        String.fromCharCode(scanRecord[26]) != '-' || String.fromCharCode(scanRecord[27]) != '0'
                        || String.fromCharCode(scanRecord[28]) != '0' || String.fromCharCode(scanRecord[29]) != '9'
                        || String.fromCharCode(scanRecord[30]) != 'c')
                        &&
                        (String.fromCharCode(scanRecord[5]) != 'L' || String.fromCharCode(scanRecord[6]) != 'N'
                            || String.fromCharCode(scanRecord[7]) != 'T'
                            || String.fromCharCode(scanRecord[24]) != 'L' || String.fromCharCode(scanRecord[25]) != 'N' ||
                            String.fromCharCode(scanRecord[26]) != '-' || String.fromCharCode(scanRecord[27]) != '2' ||
                            String.fromCharCode(scanRecord[28]) != '0' || String.fromCharCode(scanRecord[29]) != '0' ||
                            String.fromCharCode(scanRecord[30]) != 'c'))
                ) {


                    return 2;
                }
                else {

                    //String s=String.valueOf(scanRecord[5] + scanRecord[6]+scanRecord[7]+scanRecord[28] + scanRecord[29]+scanRecord[30]);
                    //mScanBt.setText(s);
                    return 2;//version C
                }

            }
            else {
                return 1;
            }
        }
        else {
            return 0;
        }
    }

    getSensetive() {
        var sensitivityV = AppBase.Setting.shushi;

        if (sensitivityV == "4") {
            this.greenYV = 4; //黄绿色触发值 相当于520
            this.redV = 30;//红色触发值 相当于400
            this.yellowV = 11;//黄色触发值
            this.orangeV = 22;//橙色触发值
        }
        else if (sensitivityV == "3") {
            this.greenYV = 11; //黄绿色触发值 相当于480
            this.redV = 60;//红色触发值 相当于267
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV;//黄色触发值
            this.orangeV = this.yellowV + this.VstepV;//橙色触发值
        }
        else if (sensitivityV == "2") {
            this.greenYV = 20; //黄绿色触发值 相当于480
            this.redV = 90;//红色触发值 相当于200
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV;//黄色触发值
            this.orangeV = this.yellowV + this.VstepV;//橙色触发值
        }
        else if (sensitivityV == "1") {
            this.greenYV = 20; //黄绿色触发值 相当于480
            this.redV = 120;//红色触发值 相当于160
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV;//黄色触发值
            this.orangeV = this.yellowV + this.VstepV;//橙色触发值
        }
        else if (sensitivityV == "0") {
            this.greenYV = 20; //黄绿色触发值 相当于480
            this.redV = 150;//红色触发值 相当于133
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV;//黄色触发值
            this.orangeV = this.yellowV + this.VstepV;//橙色触发值
        }
    }

    getWetness() {
        var c, v0, DataValue;
        var mData = this.mData;
        if (this.Version == 2) {
            c = ((mData[2] & 0xFF) << 8) + (mData[1] & 0xFF);
        }
        else {
            c = ((mData[4] & 0xFF) << 8) + (mData[3] & 0xFF);
        }

        var mytempfact = 40;
        var storedRawC = c;



        if (this.displayC > c)//每测到一个信号，把C做处理后再发送。记得打开夹子时displayC=530恢复原值
        {

            this.displayC = (this.displayC * (mytempfact - 1) + c) / mytempfact;//缓慢变小
        }
        else {
            //只变小不变大
        }
        //if (c >= 80)//C小于80时只有夜尿症适用，需要快，不减速
        {
            c = this.displayC;
        }

        if (c != 0) {
            var tempV = 24000 / c;

            if (tempV < 50) {
                //int D=24000/(20+30);
                // int X=20*530*D/(530-D);
                //int Y=X/530;
                DataValue = (101760 / c - 192);
            }
            else {
                DataValue = tempV - 30;
            }
            if (DataValue < 0) DataValue = 0;
            this.setWetStatus(DataValue);
        }


        var tempcc = 0;
        var CCfactor = AppBase.Setting.mashu;
        //520	381	266	230	197	172	156	144	131	130	126	122	100
        //10	50	100	150	200	250	300	350	400	450	500	600	800
        //520	383	268	232	199	174	158	146	133	132	128	124	100
        //10	50	100	150	200	250	300	350	400	450	500	600	800
        if (CCfactor == "3") {

            var a = [10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 800];//amount table
            var v = [520, 383, 268, 232, 199, 174, 158, 146, 133, 132, 128, 124, 100];//value table

            this.setWetml(a, v, c);

        }
        else if (CCfactor == "2") {
            var a = [10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 800];//amount table Baishi
            var v = [520, 381, 266, 230, 197, 172, 156, 144, 131, 130, 126, 122, 100];//value table

            this.setWetml(a, v, c);

        }
        else {
            var a = [10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 800];//amount table Baishi
            var v = [520, 381, 266, 230, 197, 172, 156, 144, 131, 130, 126, 122, 100];//value table

            this.setWetml(a, v, c);
        }




        //alert(c);
        //alert(DataValue);
        this.cval = parseInt(DataValue).toFixed();
        this.wetval = parseInt(c).toFixed();
        this.shushidu = parseInt((DataValue * 100 / this.redV).toString());
    }

    setWetStatus(DataValue) {
        var level = 0;
        if (DataValue <= this.greenYV) {
            this.currentstatus = this.statuslist[0];
            level = 0;
            //this.notify(11,this.statuslist[1].msg);
        } else if (this.greenYV < DataValue && DataValue <= this.yellowV) {
            this.currentstatus = this.statuslist[1];
            level = 1;
            //this.notify(12,this.statuslist[2].msg);
        } else if (this.yellowV < DataValue && DataValue <= this.orangeV) {
            this.currentstatus = this.statuslist[2];
            level = 2;
            //this.notify(13,this.statuslist[3].msg);
        } else if (this.orangeV < DataValue && DataValue <= this.redV) {
            this.currentstatus = this.statuslist[3];
            level = 3;
            //this.notify(14,this.statuslist[4].msg);
        } else if (this.redV < DataValue) {
            level = 4;
            this.currentstatus = this.statuslist[4];
            this.notify(15, AppLang.Lang[this.statuslist[4].msg]);
        }
        if (level > this.level) {
            if (level == 1) {
                this.db.addWetRecord(this.deviceid, 2, this.ml);
                this.notify(12, AppLang.Lang[this.statuslist[1].msg]);
            }
            if (level == 4) {
                this.db.addWetRecord(this.deviceid, 2, this.ml);
                this.notify(14, AppLang.Lang[this.statuslist[4].msg]);
            }
            this.level = level;
        }

        //this.recordapi.update({ mac: this.deviceid, op: "N", ml: this.ml, level: this.level, data: this.advertising }).then((ret) => {
        //    console.log(ret);
        //});

    }

    setWetml(a, v, c) {

        var K = Array(a.length - 1);//slope
        for (var i = 0; i < K.length; i++) {
            K[i] = 1000 * (a[i + 1] - a[i]) / (v[i] - v[i + 1]);//K is a scaled 1000 times slope
        }
        if (c > v[0]) //c is the read value from the sensor. Amont is not detectable now
        {
            this.wetml = "0ml";
            this.ml = 0;
        }
        else if (c < v[v.length - 1]) //amount over the max measurable value
        {
            this.wetml = ">" + a[a.length - 1].toFixed() + "ml";
            this.ml = a[a.length - 1];
        }
        else {  //amount measurable
            for (var i = 0; i < K.length; i++) {
                if (c < v[i] && c > v[i + 1]) {
                    var tempV = a[i] + K[i] * (v[i] - c) / 1000;
                    this.wetml = tempV.toFixed().toString() + "ml";
                    this.ml = tempV;
                    break;
                }
            }
        }
    }

    getPost() {
        var posture = this.mData[5];
        if ((posture & 0x1) == 1) {  //sleeping
            this.post = AppLang.Lang["selectdown"];
            if(this.postimg!="卧"){
                this.fan=="N";
            }
            this.postimg = "卧";
        } else if ((posture >> 1 & 0x1) == 1) {
            this.post = AppLang.Lang["selectleft"];
            if(this.postimg!="左"){
                this.fan=="N";
            }
            this.postimg = "左";
        }
        else if ((posture >> 2 & 0x1) == 1) {
            this.post = AppLang.Lang["selectup"];
            if(this.postimg!="仰"){
                this.fan=="N";
            }
            this.postimg = "仰";
        }
        else if ((posture >> 3 & 0x1) == 1) {
            this.post = AppLang.Lang["selectright"];
            if(this.postimg!="右"){
                this.fan=="N";
            }
            this.postimg = "右";
        }
        else if ((posture >> 4 & 0x1) == 1) {
            this.post = "| | |";
            this.postimg = "";
        }
        else if ((posture >> 5 & 0x1) == 1) {
            this.post = "! ! !";
            this.postimg = "";
        }
        else {
            this.post = "N/A";
            this.postimg = "";
        }


        var move = (this.mData[6] & 0xFF);
        var ts = parseInt((move * 1).toFixed());
        if (ts < 60) {
            this.nomovetime = ts + AppLang.Lang["s"];
        } else if (60 <= ts && ts < 3600) {
            this.nomovetime = (ts / 60).toFixed() + AppLang.Lang["m"];
        } else {
            this.nomovetime = (ts / 3600).toFixed() + AppLang.Lang["h"];
        }
        var fanshentips = AppLang.Lang["timetochange"];
        var hoursecond=3600;
        if (AppBase.Setting.fanshen == "1") {
            if (ts > 1 * hoursecond) {
                this.fan=="Y";
                this.notify(5, fanshentips)
            }
        }
        if (AppBase.Setting.fanshen == "2") {
            if (ts > 2 * hoursecond) {
                this.fan=="Y";
                this.notify(5, fanshentips)
            }
        }
        if (AppBase.Setting.fanshen == "3") {
            if (ts > 3 * hoursecond) {
                this.fan=="Y";
                this.notify(5, fanshentips)
            }
        }

    }
    fall30=false;//30秒以内的跌倒数据不再重复计入
    checkFall() {
        var that=this;
        var posture = this.mData[5];
        if ((posture >> 7 & 0x1) == 1) {   //fall
            //alert("dielea"+this.fall+"~"+(this.fall30?"30":"100"));
            if (this.fall != 'Y'&&this.fall30==false) {
                this.fall30=true;
                this.fall = "Y";
                this.notify(3, AppLang.Lang["falltohelp"]);
                this.db.addWetRecord(this.deviceid, 4, this.ml);
                setTimeout(function(){
                    that.fall30=false;
                },40000);
            }
        } else {
            //this.fall = "N";
        }

    }
    debugFall(){

        this.db.addWetRecord(this.deviceid, 4, this.ml);
        this.fall = "Y";
        this.notify(3, AppLang.Lang["falltohelp"]);
    }

    cleardata() {
        this.currentstatus = this.disconnectstatus;
        this.temperature = "--";
        //this.wetml = "--ml";
        
        this.cval = "--";
        this.wetval = "--";
        this.battery = AppLang.Lang["unconnected"];
        this.fall = "N";
        this.post = AppLang.Lang["no"];
        this.postimg = "";
        this.nomovetime = "--";
        this.usetime = "--";
        //this.displayC = 530;
    }
    localNotifications: LocalNotifications = null;
    nativeAudio: NativeAudio = null;
    notifylist = [];
    setNotification(localNotifications: LocalNotifications) {
        this.localNotifications = localNotifications;
    }
    setNativeAudio(nativeAudio: NativeAudio) {
        this.nativeAudio = nativeAudio;
    }
    t=0;
    notify(type, content: string) {
        if (AppBase.Setting.alert != "Y") {
            return;
        }
        var time = new Date();
        var ida = type.toString() + time.getFullYear().toString() + time.getMonth().toString() + time.getDate().toString()
            + time.getHours().toString() + (time.getMinutes()/10).toString();
        var id = parseInt(ida);
        if (this.notifylist[id] == undefined) {
            if (AppBase.IsMobileWeb == false) {

                try {
                    if (type == 3) {
                        var that=this;
                        
                        var fallinterval=setInterval(function(){
                            that.nativeAudio.play("fall");
                            that.t++;
                            if(that.fall!="Y"){
                                that.t=0;
                                clearInterval(fallinterval);
                            }
                        },1000);
                        

                        this.localNotifications.schedule({
                            id: id,
                            text: content,
                            vibrate: true,
                            sound: "nosound"
                        });
                    }
                    else if (type == 5) {
                        this.nativeAudio.play("fanshen");

                        this.localNotifications.schedule({
                            id: id,
                            text: content,
                            vibrate: true,
                            sound: "nosound"
                        });

                        var that=this;
                        var faninterval=setInterval(function(){
                            that.nativeAudio.play("fanshen2");

                            this.localNotifications.schedule({
                                id: id,
                                text: content,
                                vibrate: true
                            });
                            if(that.fan!="Y"){
                                clearInterval(faninterval);
                            }
                        },60000*5);

                    } else if (type == 4) {

                        this.localNotifications.schedule({
                            id: id,
                            text: content,
                            vibrate: true
                        });

                    } else {

                        this.nativeAudio.play("wet");
                        this.localNotifications.schedule({
                            id: id,
                            text: content,
                            vibrate: true,
                            sound: "nosound"
                        });

                    }
                } catch (e) {

                }



            }
            this.notifylist[id] = 1;
        }
    }
}