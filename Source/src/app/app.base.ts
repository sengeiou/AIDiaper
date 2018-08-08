import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppLang } from "./app.lang";
import { StatusBar } from '@ionic-native/status-bar';
import {TabsPage} from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { NavController, ModalController, ViewController, App } from "ionic-angular";
import { Storage } from '@ionic/storage';

export class AppBase{

    static Storage:Storage=null;
    static Setting={sound:"Y",shushi:"1",mashu:"1",fanshen:"1"};
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
        this.Lang=AppLang.InitLang();
        this.setting=AppBase.Setting;
    }
    setStatusBar(){
        this.statusBar.styleDefault();
    }
    ionViewDidLoad(){
        this.onMyLoad();
        
    }
    onMyLoad(){
        
    }
    ionViewDidEnter(){
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

}