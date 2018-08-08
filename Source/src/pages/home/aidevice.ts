import { AppBase } from "../../app/app.base";
import { DateTime } from "../../../node_modules/ionic-angular/umd";
import { LocalNotifications } from '@ionic-native/local-notifications';

export class AIDevice {

    isclick=false;
    lasttimespan=0;
    usetime="--";

    lastupdatetime=0;


    Version = 0;
    scanRecord = [];
    mData = [];
    angleData = Array(3);

    VstepV = 0;
    greenYV = 4; //黄绿色触发值 相当于520
    redV = 30;//红色触发值 相当于400
    yellowV = 11;//黄色触发值
    orangeV = 22;//橙色触发值



    wetml = "0ml";
    wetval = "--";
    cval = "--";


    statuslist = [];
    disconnectstatus = { color: "#fcfcfc", name: "断开", idx: "",msg:"目前无法获得设备信息" };
    currentstatus = { color: "#fcfcfc", name: "断开", idx: "" };

    temperature = "--";
    v0 = 0.0;
    battery = "已断开";
    post = "";
    nomovetime="--";

    fall = "N";

    statusCheck=null;


    constructor() {
        this.statuslist.push({ color: "#72aa2b", name: "舒适",msg:"目前感觉非常舒适" });
        this.statuslist.push({ color: "#dff300", name: "干爽",msg:"目前状态良好" });
        this.statuslist.push({ color: "#f3bd00", name: "适中",msg:"目前状态适中" });
        this.statuslist.push({ color: "#e65c00", name: "微潮",msg:"尿布状态已经微湿，请立即跟换" });
        this.statuslist.push({ color: "#ff0000", name: "潮湿" ,msg:"尿布状态已经不舒服，请立即跟换" });

        this.currentstatus = this.disconnectstatus;
        this.lastupdatetime=(new Date).getTime()/1000;
        

    }
    startTime(){
        var that=this;
        this.statusCheck=setInterval(()=>{
            this.timerFunc();
        },1000);
    }
    timerFunc(){
        var nowtime=(new Date()).getTime()/1000;      
        if(nowtime-this.lastupdatetime>20){
            this.cleardata();
            this.notify(4,"已断开连接");
        }
        if(this.lasttimespan>0){
            var ts=parseInt((nowtime-this.lasttimespan).toFixed());
            if(ts<60){
                this.usetime=ts+"秒";
            }else if(60<=ts&&ts<3600){
                this.usetime=(ts/60).toFixed()+"分钟";
            }else{
                this.usetime=(ts/3600).toFixed()+"小时";
                var lstminute=parseInt(((ts%3600)/60).toFixed());
                if(lstminute>0){
                    this.usetime+=lstminute+"分钟";
                }
            }
        }
    }

    reloaddata(datastr: String) {
        this.lastupdatetime=(new Date).getTime()/1000;

        this.scanRecord = datastr.split(",");
        this.setVersion();

        var mlength = this.getwholeDatelength();
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
        var mdataPosition = this.getDataPosition();
        for (var i = mdataPosition; i < (this.mData.length + mdataPosition); i++) {
            this.mData[i - mdataPosition] = this.scanRecord[i];
        }
        this.angleData[0] = this.scanRecord[mdataPosition - 3];
        this.angleData[1] = this.scanRecord[mdataPosition - 2];
        this.angleData[2] = this.scanRecord[mdataPosition - 1];

        

        if(this.mData[0]==0x00){
            this.isclick=false;
            this.lasttimespan=0;
            this.cleardata();
        }else{

            if(this.isclick==false){
                this.isclick=true;
                this.lasttimespan=(new Date()).getTime()/1000;
            }

            this.getSensetive();
            this.getWetness();
    
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
        if(this.v0<=0){
            this.battery="已断开";
        }else if(this.v0<2){
            this.battery="低电量";
        }else{
            this.battery="正常";
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

    private getwholeDatelength() {
        if (this.Version == 0)
            return 25;
        if (this.Version == 1)
            return 27;
        else
            return 31;
    }
    private getDataPosition() {
        if (this.Version == 0)
            return 18;
        if (this.Version == 1)
            return 9;
        if (this.Version == 2)
            return 14;
        else
            return 9;
    }
    private setVersion() {
        if (this.scanRecord.length < 25 || this.scanRecord[0] != 0x02 || this.scanRecord[1] != 0x01 ||
            this.scanRecord[2] != 0x06 || this.scanRecord[3] != 0x03 || this.scanRecord[4] != 0x03 ||
            this.scanRecord[5] != 0x58 || this.scanRecord[6] != 0x69 || String.fromCharCode(this.scanRecord[9]) != 'L' ||
            String.fromCharCode(this.scanRecord[10]) != 'N' || String.fromCharCode(this.scanRecord[11]) != '-'
            || String.fromCharCode(this.scanRecord[12]) != '2' ||
            String.fromCharCode(this.scanRecord[13]) != '0' || String.fromCharCode(this.scanRecord[14]) != '0'
            || String.fromCharCode(this.scanRecord[15]) != 'N' ||
            this.scanRecord[18] == 0x00
        ) {

            if (this.scanRecord.length < 27 || this.scanRecord[0] != 0x02 || this.scanRecord[1] != 0x01 ||
                this.scanRecord[2] != 0x06 ||
                String.fromCharCode(this.scanRecord[5]) != 'S' || String.fromCharCode(this.scanRecord[6]) != 'A'
                || String.fromCharCode(this.scanRecord[7]) != 'N' || String.fromCharCode(this.scanRecord[8]) != ' ' || this.scanRecord[9] != 0x01
            ) {
                if (this.scanRecord.length < 31 || this.scanRecord[0] != 0x02 || this.scanRecord[1] != 0x01 ||
                    this.scanRecord[2] != 0x06

                    || this.scanRecord[14] != 0x1 ||

                    ((String.fromCharCode(this.scanRecord[5]) != 'S' || String.fromCharCode(this.scanRecord[6]) != 'A' ||
                        String.fromCharCode(this.scanRecord[7]) != 'N' ||
                        String.fromCharCode(this.scanRecord[23]) != 'S' ||
                        String.fromCharCode(this.scanRecord[24]) != 'W' || String.fromCharCode(this.scanRecord[25]) != 'L' ||
                        String.fromCharCode(this.scanRecord[26]) != '-' || String.fromCharCode(this.scanRecord[27]) != '0'
                        || String.fromCharCode(this.scanRecord[28]) != '0' || String.fromCharCode(this.scanRecord[29]) != '9'
                        || String.fromCharCode(this.scanRecord[30]) != 'c')
                        &&
                        (String.fromCharCode(this.scanRecord[5]) != 'L' || String.fromCharCode(this.scanRecord[6]) != 'N'
                            || String.fromCharCode(this.scanRecord[7]) != 'T'
                            || String.fromCharCode(this.scanRecord[24]) != 'L' || String.fromCharCode(this.scanRecord[25]) != 'N' ||
                            String.fromCharCode(this.scanRecord[26]) != '-' || String.fromCharCode(this.scanRecord[27]) != '2' ||
                            String.fromCharCode(this.scanRecord[28]) != '0' || String.fromCharCode(this.scanRecord[29]) != '0' ||
                            String.fromCharCode(this.scanRecord[30]) != 'c'))
                ) {


                    return;
                }
                else {

                    //String s=String.valueOf(this.scanRecord[5] + this.scanRecord[6]+this.scanRecord[7]+this.scanRecord[28] + this.scanRecord[29]+this.scanRecord[30]);
                    //mScanBt.setText(s);
                    this.Version = 2;//version C
                }

            }
            else {
                this.Version = 1;
            }
        }
        else {
            this.Version = 0;
        }
    }

    getSensetive() {
        var sensitivityV = AppBase.Setting.shushi;

        if (sensitivityV == "0") {
            this.greenYV = 4; //黄绿色触发值 相当于520
            this.redV = 30;//红色触发值 相当于400
            this.yellowV = 11;//黄色触发值
            this.orangeV = 22;//橙色触发值
        }
        else if (sensitivityV == "1") {
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
        else if (sensitivityV == "3") {
            this.greenYV = 20; //黄绿色触发值 相当于480
            this.redV = 120;//红色触发值 相当于160
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV;//黄色触发值
            this.orangeV = this.yellowV + this.VstepV;//橙色触发值
        }
        else if (sensitivityV == "4") {
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
        if (CCfactor == "3") {

            var a = [50, 80, 120, 160, 200, 240, 280, 320];//amount table
            var v = [525, 480, 413, 348, 310, 275, 238, 213];//value table

            this.setWetml(a, v, c);

        }
        else if (CCfactor == "2") {
            var a = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];//amount table Baishi
            var v = [510, 439, 362, 298, 242, 210, 192, 177, 160, 150];//value table

            this.setWetml(a, v, c);

        }
        else{
            var a = [10, 20, 30, 40, 50, 100, 150, 200, 300, 400];//amount table Huai
            var v = [520, 477, 458, 377, 342, 270, 256, 231, 205, 177];//value table

            this.setWetml(a, v, c);
        }
        //alert(c);
        //alert(DataValue);
        this.cval = parseInt(DataValue).toFixed();
        this.wetval = parseInt(c).toFixed();
    }

    setWetStatus(DataValue) {
        if (DataValue <= this.greenYV) {
            this.currentstatus = this.statuslist[0];
            //this.notify(11,this.statuslist[1].msg);
        } else if (this.greenYV < DataValue && DataValue <= this.yellowV) {
            this.currentstatus = this.statuslist[2];
            //this.notify(12,this.statuslist[2].msg);
        } else if (this.yellowV < DataValue && DataValue <= this.orangeV) {
            this.currentstatus = this.statuslist[3];
            this.notify(13,this.statuslist[3].msg);
        } else if (this.orangeV < DataValue && DataValue <= this.redV) {
            this.currentstatus = this.statuslist[4];
            this.notify(14,this.statuslist[4].msg);
        } else if (this.redV < DataValue) {
            this.currentstatus = this.statuslist[5];
            this.notify(15,this.statuslist[5].msg);
        }
    }

    setWetml(a, v, c) {

        var K = Array(a.length - 1);//slope
        for (var i = 0; i < K.length; i++) {
            K[i] = 1000 * (a[i + 1] - a[i]) / (v[i] - v[i + 1]);//K is a scaled 1000 times slope
        }
        if (c > v[0]) //c is the read value from the sensor. Amont is not detectable now
        {
            this.wetml = "0ml";
        }
        else if (c < v[v.length - 1]) //amount over the max measurable value
        {
            this.wetml = ">" + a[a.length - 1].toFixed() + "ml";
        }
        else {  //amount measurable
            for (var i = 1; i < K.length; i++) {
                if (c < v[i] && c > v[i + 1]) {
                    var tempV = a[i] + K[i] * (v[i] - c) / 1000;
                    this.wetml = tempV.toFixed().toString() + "ml";
                    break;
                }
            }
        }
    }

    getPost() {
        var posture = this.mData[5];
        if ((posture & 0x1) == 1) {  //sleeping
            this.post = "爬睡";
        } else if ((posture >> 1 & 0x1) == 1) {
            this.post = "右侧卧";
        }
        else if ((posture >> 2 & 0x1) == 1) {
            this.post = "仰卧";
        }
        else if ((posture >> 3 & 0x1) == 1) {
            this.post = "左侧卧";
        }
        else if ((posture >> 4 & 0x1) == 1) {
            this.post = "| | |";
        }
        else if ((posture >> 5 & 0x1) == 1) {
            this.post = "! ! !";
        }
        else {
            this.post = "N/A";
        }


		var move=(this.mData[6] & 0xFF);
        var ts=parseInt((move*1).toFixed());
        if(ts<60){
            this.nomovetime=ts+"秒";
        }else if(60<=ts&&ts<3600){
            this.nomovetime=(ts/60).toFixed()+"分钟";
        }else{
            this.nomovetime=(ts/3600).toFixed()+"小时";
        }
        if(AppBase.Setting.fanshen=="1"){
            if(ts>1*3600){
                this.notify(5,"已经有超过"+this.nomovetime+"没有调整睡姿了。")
            }
        }
        if(AppBase.Setting.fanshen=="2"){
            if(ts>3*3600){
                this.notify(5,"已经有超过"+this.nomovetime+"没有调整睡姿了。")
            }
        }
        if(AppBase.Setting.fanshen=="3"){
            if(ts>5*3600){
                this.notify(5,"已经有超过"+this.nomovetime+"没有调整睡姿了。")
            }
        }

    }

    checkFall() {
        var posture = this.mData[5];
        if ((posture >> 7 & 0x1) == 1) {   //fall
            this.fall = "Y";
            this.notify(3,"跌落了，请赶快处理");
        } else {
            this.fall = "N";
        }

    }
    
    cleardata(){
        this.currentstatus=this.disconnectstatus;
        this.temperature="--";
        this.wetml="--ml";
        this.cval="--";
        this.wetval="--";
        this.battery="已断开";
        this.battery="已断开";
        this.fall="N";
        this.post="无";
        this.nomovetime="--";
        this.usetime="--";
    }
    localNotifications:LocalNotifications=null;
    notifylist=[];
    setNotification(localNotifications:LocalNotifications){
        this.localNotifications=localNotifications;
    }
    notify(type,content:string){
        
        var time=new Date();
        var ida=type.toString()+time.getFullYear().toString()+time.getMonth().toString()+time.getDate().toString()
        +time.getHours().toString()+time.getMinutes().toString();
        var id=parseInt(ida);
        if(this.notifylist[id]==undefined){

            if(AppBase.IsMobileWeb==false){
                this.localNotifications.schedule({
                    id: id,
                    text: content,
                    vibrate:true,
                    //silent:AppBase.Setting.sound=="Y"
                  });
                
            }
            this.notifylist[id]=1;
        }
    }
}