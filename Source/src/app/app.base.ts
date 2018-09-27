import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppLang } from "./app.lang";
import { StatusBar } from '@ionic-native/status-bar';
import {TabsPage} from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { NavController, ModalController, ViewController, App } from "ionic-angular";
import { Storage } from '@ionic/storage';

export class AppBase{
    static research=false;

    static Storage:Storage=null;
    static Setting={alert:"Y",sound:"Y",shushi:"1",mashu:"1",fanshen:"1",lang:"cn"};
    setting=null;

    Lang=[];
    static IsIos:boolean=false;
    static IsAndroid:boolean=false;
    static IsMobileWeb:boolean=false;

    static TabChangeParamCache=null;

    public statusBar:StatusBar=null;
    public navCtrl:NavController=null;
    public modalCtrl:ModalController=null;
    public viewCtrl:ViewController=null;
    public statusBarStyle="X";//{DARK}
    public uploadpath:string=ApiConfig.getUploadPath();
    public util=AppUtil;
    public constructor(navCtrl:NavController,
        modalCtrl:ModalController, 
        viewCtrl:ViewController,
        statusBar:StatusBar){
            
        this.navCtrl=navCtrl;
        this.modalCtrl=modalCtrl;
        this.viewCtrl=viewCtrl;
        this.statusBar=statusBar;
        this.setting=AppBase.Setting;

        this.Lang=AppLang.getLang(AppBase.Setting.lang);
        
    }
    setStatusBar(){
        this.statusBar.styleDefault();
    }
    ionViewDidLoad(){
        this.Lang=AppLang.getLang(AppBase.Setting.lang);
        this.onMyLoad();
    }
    onMyLoad(){
        
    }
    ionViewDidEnter(){
        this.reloadSetting();
        this.Lang=AppLang.getLang(AppBase.Setting.lang);
        //alert(JSON.stringify(this.Lang));
        this.setStatusBar();
        this.onMyShow();
    }
    onMyShow(){
        
    }
    onPullRefresh(ref){
        this.onMyShow();
        ref.complete();
    }
    doRefresh(ref){
      setTimeout(() => {
        this.onPullRefresh(ref);
        ref.complete();
      }, 2000);
    }
    changeTab(index,param){
        //var tabsPage=AppBase.tabsPage;
        //tabsPage.tabRef.select(index,param);
        //var tab=AppBase.tabsPage.tabRef.getSelected();
        //console.log(tab);
        AppBase.TabChangeParamCache={tabIndex:index,param:param};
        this.navCtrl.parent.select(index);
        
    }
    back(){
        this.navCtrl.pop();
    }
    close(data){
        this.viewCtrl.dismiss(data);
    }
    nagivate(pagename,param){  
        if(param==undefined||param==null){
            param={};
        }
        this.navCtrl.push(pagename,param);
    }
    modal(pageobj,param,callback=null){
        var modal=this.modalCtrl.create(pageobj,param);
        modal.onDidDismiss(data => {
            if(callback!=null){
                callback(data);
            }
        });
        modal.present();
    }
    decode(val){
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str){
        if(str==null){
            return [""];
        }
        return str.split("\n");
    }
    reloadSetting(){
      AppBase.Setting.alert=localStorage.getItem("setting_alert")==null?AppBase.Setting.alert:localStorage.getItem("setting_alert");
      AppBase.Setting.lang=localStorage.getItem("setting_lang")==null?AppBase.Setting.lang:localStorage.getItem("setting_lang");
      AppBase.Setting.sound=localStorage.getItem("setting_sound")==null?AppBase.Setting.sound:localStorage.getItem("setting_sound");
      AppBase.Setting.shushi=localStorage.getItem("setting_shushi")==null?AppBase.Setting.shushi:localStorage.getItem("setting_shushi");
      AppBase.Setting.mashu=localStorage.getItem("setting_mashu")==null?AppBase.Setting.mashu:localStorage.getItem("setting_mashu");
      AppBase.Setting.fanshen=localStorage.getItem("setting_fanshen")==null?AppBase.Setting.fanshen:localStorage.getItem("setting_fanshen");
    }

}