﻿import {ApiConfig} from './api.config';
import {  AlertController, ToastController } from 'ionic-angular';

export class AppUtil {
    public static isMicroMessager: boolean = false; //是否是在微信内置浏览器打开.
    public static isLessThenAndroid5: boolean = false; //<= android 4.4
    public static isIOS: boolean = false; //是否是在Iphone设备, 不论是微信打开,还是APP.
    public static osVersion = '';
	
    public static HtmlDecode(str) {
        if(str==null){
            return "";
        }
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");

        var reg=new RegExp("\"/alucard263096/zhizhenapp/upload/","g"); //创建正则RegExp对象   
        s= s.replace(reg,"\"http://cmsdev.app-link.org/alucard263096/zhizhenapp/upload/"); 
        
        return s;
    }

    public static Toast(toastCtrl,msg) {
        let toast = toastCtrl.create({
            message: msg
        });
        toast.present();
    }

    public static FormatDateTime(val: Date) {
        var monthstr=(val.getMonth() + 1)>9?(val.getMonth() + 1).toString():"0"+(val.getMonth() + 1).toString();
        var datestr=(val.getDate() )>9?(val.getDate() ).toString():"0"+(val.getDate() ).toString();
        var hourstr=(val.getHours() )>9?(val.getHours() ).toString():"0"+(val.getHours() ).toString();
        var minstr=(val.getMinutes() )>9?(val.getMinutes() ).toString():"0"+(val.getMinutes() ).toString();
        var secstr=(val.getSeconds() )>9?(val.getSeconds() ).toString():"0"+(val.getSeconds() ).toString();
        return val.getFullYear() + "-" + monthstr + "-" + datestr+
            " " + hourstr + ":" + minstr + ":" + secstr;
    }

    public static IsMobileNo(str){

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return myreg.test(str);
    }
    public static FormatPercent(val) {
        val = val * 100.0;
        return val.toFixed(2) + '%';
    }
    public static FormatPrice(val) {
        val = val * 1.0;
        return val.toFixed(2);
    }
    public static FormatNumber(val, digits) {
        val = val * 1.0;
        return val.toFixed(digits);
    }
    public static FormatDate(val: Date) {
        var monthstr=(val.getMonth() + 1)>9?(val.getMonth() + 1).toString():"0"+(val.getMonth() + 1).toString();
        var datestr=(val.getDate() )>9?(val.getDate() ).toString():"0"+(val.getDate() ).toString();
        return val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate();
    }
    public static FormatDate2(val: Date) {
        var monthstr=(val.getMonth() + 1)>9?(val.getMonth() + 1).toString():"0"+(val.getMonth() + 1).toString();
        var datestr=(val.getDate() )>9?(val.getDate() ).toString():"0"+(val.getDate() ).toString();
        return val.getFullYear() + "-" + monthstr + "-" + datestr;
    }

    public static DateTimeStrToDate(datetimestr:string){
        var s1=datetimestr.split(" ");
        var datestr=s1[0];
        var timestr=s1[1];
        var date=datestr.split("-");
        var time=timestr.split(":");
        var year=parseInt(date[0]);
        var month=parseInt(date[1]);
        var day=parseInt(date[2]);

        var hour=parseInt(time[0]);
        var minute=parseInt(time[1]);
        var second=parseInt(time[2]);

        return new Date(year,month-1,day,hour,minute,second);
    }

    public static MiddleToast(toastCtrl: ToastController, msg) {
        let toast = toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }
}