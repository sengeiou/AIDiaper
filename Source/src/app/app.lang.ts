

export class AppLang {
    static Lang=[];
    static lastlang="";
    static cn(){
        var ret=[];
        ret["home"]="首页";
        ret["history"]="历史记录";
        ret["mall"]="商城";
        ret["setting"]="设置"; 
        ret["findingsensor"]="正在寻找智能感应器"; 
        ret["findandclick"]="找到以下设备，点击目标设备"; 
        ret["devicename"]="设备名"; 
        ret["status"]="状态"; 
        ret["clicked"]="扣上"; 
        ret["opened"]="打开"; 
        ret["address"]="地址"; 
        ret["signal"]="信号强度"; 
        ret["battery"]="电量"; 
        ret["usetime"]="已使用时长"; 
        ret["temperature"]="温度"; 
        ret["generalindex"]="综合舒适指数"; 
        ret["forecastniaoliang"]="预测尿量"; 
        ret["xishouliang"]="可吸收量"; 
        ret["urgent"]="应急提醒"; 
        ret["urgenttips"]="应急提醒"; 
        ret["nodata"]="暂无"; 
        ret["fallcare"]="摔倒护理"; 
        ret["sleepmonitor"]="睡姿监控"; 
        ret["posttime"]="睡时长"; 
        ret["usersetting"]="用户设置"; 
        ret["sound"]="声音"; 
        ret["on"]="开"; 
        ret["off"]="关"; 
        ret["accurrency"]="灵敏度"; 
        ret["shushi_0"]="最节约"; 
        ret["shushi_1"]="经济"; 
        ret["shushi_2"]="平衡"; 
        ret["shushi_3"]="舒适"; 
        ret["shushi_4"]="最舒适"; 

        ret["status_0"]="舒适"; 
        ret["status_1"]="干爽"; 
        ret["status_2"]="适中"; 
        ret["status_3"]="微潮"; 
        ret["status_4"]="潮湿"; 

        ret["havebeenunconnect"]="已断开连接"; 
        ret["unconnected"]="已断开连接"; 


        ret["second"]="秒"; 
        ret["minite"]="分钟"; 
        ret["hour"]="小时"; 
        ret["no"]="无"; 


        ret["s"]="秒"; 
        ret["m"]="分钟"; 
        ret["h"]="小时";

        ret["selectleft"]="左睡"; 
        ret["selectright"]="右睡"; 
        ret["selectup"]="仰睡"; 
        ret["selectdown"]="卧睡"; 


        ret["timetochange"]="翻身时间到了，请及时护理，谢谢！"; 
        ret["falltohelp"]="跌落了，请赶快处理";

        ret["msg_0"]="目前感觉非常舒适"; 
        ret["msg_1"]="目前状态良好"; 
        ret["msg_2"]="目前状态适中"; 
        ret["msg_3"]="纸尿裤状态已经微湿，请立即更换"; 
        ret["msg_4"]="纸尿裤状态已经不舒服，请立即更换"; 
         
        ret["unconnec"]="断开"; 
        ret["connect"]="打开"; 
        ret["nodeviceconnect"]="目前无法获得设备信息";
        ret["clickopenandchange"]="夹子打开了，请更换纸尿裤"; 
        
        ret["basesetting"]="基础设置";
        ret["cn"]="中文";
        ret["en"]="英语";
        ret["alert"]="报警";
        ret["home"]="首页";


        ret["size"]="码数";
        ret["fanshentips"]="翻身提醒";
        ret["noalert"]="不提醒";
        ret["usestatement"]="使用声明";
        ret["rescan"]="重新扫描设备";
        
        
        ret["record_1"]="尿湿记录";
        ret["record_2"]="跌落记录";
        ret["record_3"]="用片统计";
        ret["record_4"]="尿量统计";
        ret["daterange"]="日期范围";
        ret["datadetail"]="数据详情";
        ret["nodatanow"]="暂无记录";


        ret["time"]="时间";
        ret["status"]="状态";
        ret["peeml"]="尿量";
        ret["startpee"]="开始尿湿";
        ret["peetips"]="尿湿提醒";
        ret["changepaper"]="更换尿布";
        ret["date"]="日期";
        ret["usetime"]="用品次数";


        ret["day1"]="当日";
        ret["day7"]="近7日";
        ret["day14"]="近14日";
        ret["day30"]="近30日";

//this.Lang["ci"]
        ret["ci"]="次";
        ret["dao"]="到";

        ret["fallhappen"]="发生跌落日期";
        ret["fallcount"]="发生跌落次数";

        ret["language"]="语言";
        
        ret["ok"]="确定";
        ret["cancel"]="取消";

        ret["state_1"]="1、本产品所有监测数据仅供护理参考，不可用于医疗诊断依据；";
        ret["state_2"]="2、本产品具有“摔倒护理”报警功能，使用过程如有偏差，在产品设计可允许误差范围内；报警数据与多重因素有关，故该功能仅供参考；";
        ret["state_3"]="3、本产品所有解释权归广东互爱健康产业科技有限公司所有。";

        ret["卧"]="卧";
        ret["左"]="左";
        ret["仰"]="仰";
        ret["右"]="右";
        return ret;
    }
    static en(){
        var ret=[];
        


        ret["home"]="Home";
        ret["history"]="History";
        ret["mall"]="Mall";
        ret["setting"]="Setting"; 
        ret["findingsensor"]="Finding Smart Device"; 
        ret["findandclick"]="Find devices below, click to monitor"; 
        ret["devicename"]="Device Name"; 
        ret["status"]="Status"; 
        ret["clicked"]="Clicked"; 
        ret["opened"]="Open"; 
        ret["address"]="Device ID"; 
        ret["signal"]="Signal"; 
        ret["battery"]="Battry"; 
        ret["usetime"]="Use Time"; 
        ret["temperature"]="Temperature"; 
        ret["generalindex"]="Comfortable"; 
        ret["forecastniaoliang"]="Urine"; 
        ret["xishouliang"]="Absorbable"; 
        ret["urgent"]="Urgent"; 
        ret["urgenttips"]="Urgent Alarm"; 
        ret["nodata"]="No Data"; 
        ret["fallcare"]="Falling Care"; 
        ret["sleepmonitor"]="Posture"; 
        ret["posttime"]="Time";
        ret["usersetting"]="User Setting"; 
        ret["sound"]="Sound"; 
        ret["on"]="On"; 
        ret["off"]="Off"; 
        ret["accurrency"]="Sensitivity"; 
        ret["shushi_0"]="Most Economical"; 
        ret["shushi_1"]="Economical"; 
        ret["shushi_2"]="Balance"; 
        ret["shushi_3"]="Comfortable"; 
        ret["shushi_4"]="Most Comfortable"; 

        ret["status_0"]="Comfortable"; 
        ret["status_1"]="Dry"; 
        ret["status_2"]="Moderate"; 
        ret["status_3"]="Moistish"; 
        ret["status_4"]="Wet"; 

        ret["havebeenunconnect"]="Disconnected"; 
        ret["unconnected"]="Disconnected"; 


        ret["second"]="Second"; 
        ret["minite"]="Minute"; 
        ret["hour"]="Hour"; 
        ret["no"]="No"; 


        ret["s"]="s"; 
        ret["m"]="m"; 
        ret["h"]="h"; 


        ret["selectleft"]="Left"; 
        ret["selectright"]="Right"; 
        ret["selectup"]="Up"; 
        ret["selectdown"]="Down"; 


        ret["timetochange"]="Time to turn over, please take care!"; 
        ret["falltohelp"]="Falling, please help!";

        ret["msg_0"]="Feel comfortable"; 
        ret["msg_1"]="Fell good"; 
        ret["msg_2"]="Fell ok"; 
        ret["msg_3"]="Diaper is wet, please replace it."; 
        ret["msg_4"]="Diaper is very wet, replace it immediately."; 
         
        ret["unconnec"]="disconnected"; 
        ret["connect"]="Connect"; 
        ret["nodeviceconnect"]="Lost device now.";
        ret["clickopenandchange"]="Device is unclicked, please check it."; 
        
        ret["basesetting"]="Base Setting";
        ret["cn"]="Chinese";
        ret["en"]="English";
        ret["alert"]="Alarm";
        ret["home"]="Home";


        ret["size"]="Size";
        ret["fanshentips"]="Turn over";
        ret["noalert"]="No Alarm";
        ret["usestatement"]="Use Statement";
        ret["rescan"]="Re-scan";
        
        
        ret["record_1"]="Wet";
        ret["record_2"]="Falling";
        ret["record_3"]="Use";
        ret["record_4"]="Volume";
        ret["daterange"]="Date Range";
        ret["datadetail"]="Detail";
        ret["nodatanow"]="No record";


        ret["time"]="Time";
        ret["status"]="Status";
        ret["peeml"]="Urine Volume";
        ret["startpee"]="First Wet";
        ret["peetips"]="Wet Alarm";
        ret["changepaper"]="Replace";
        ret["date"]="Date";
        ret["usetime"]="Use time";


        ret["day1"]="Today";
        ret["day7"]="Weekly";
        ret["day14"]="Biweekly";
        ret["day30"]="Monthly";

        ret["ci"]="times";
        ret["dao"]="to";

        ret["fallhappen"]="Falling date";
        ret["fallcount"]="Falling times";
        ret["language"]="Language";

        
        
        ret["ok"]="Ok";
        ret["cancel"]="Cancel";

        


        ret["state_1"]="1. All monitoring data of this product is for nursing reference only and cannot be used for medical diagnosis";
        ret["state_2"]="2. This product has the \"Drop Alarm\" function. If there is a deviation in the use process, it is within the allowable error range of the product design; the alarm data is related to multiple factors, so this function is for reference only";
        ret["state_3"]="3. All interpretation rights of this product belong to Guangdong Carelder Health Industry Technology Co., Ltd.        ";

        ret["卧"]="down";
        ret["左"]="left";
        ret["仰"]="up";
        ret["右"]="right";
        return ret;
    }
    static getLang(lang){
        if(lang==AppLang.lastlang){
            return AppLang.Lang;
        }
        if(lang=="en"){
            AppLang.Lang= AppLang.en();
        }else{
            AppLang.Lang= AppLang.cn();
        }

        //alert(JSON.stringify(AppLang.Lang["home"]));
        return AppLang.Lang;
    }
}