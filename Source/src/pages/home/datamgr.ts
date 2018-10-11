import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AppUtil } from '../../app/app.util';

export class DataMgr {
    sqlite: SQLite = null;
    ready = false;
    dbmgr: SQLiteObject = null;

    constructor(sqlite: SQLite) {
        this.sqlite = sqlite;

        this.sqlite.create({
            name: 'data181011.db',
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                db.executeSql('create table if not exists wetrecord(mac VARCHAR(32),record_time datetime,record_date date,op VARCHAR(1),ml int)', [])
                    .then(() => {
                        console.log('Executed SQL');

                        this.dbmgr = db;
                        this.ready = true;
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    addWetRecord(mac, op, ml) {
        if(op==1){
            if(ml>10){
                return;
            }
        }
        if(op==2){
            if(ml<20){
                return;
            }
        }
        if(op==3){
            if(ml<30){
                return;
            }
        }
        //alert(mac+"~"+op+"~"+ml);
        if (this.dbmgr == null) {
            return;
        }

        var param = [mac, op, ml];
        var today = new Date();
        var todaystr = AppUtil.FormatDate(today);
        var nottime = AppUtil.FormatDateTime(new Date());
        var nottime12 = AppUtil.FormatDateTime( new Date( (new Date()).getTime()-12*3600*1000));
        this.dbmgr.executeSql("select * from wetrecord where op='3' and record_date=? and mac='"+mac+"' ", [todaystr]).then((ret) => {
            var ctime="";
            if (ret.rows.length == 0 && op != 4 && op != 3) {

                var yesterdaystr = AppUtil.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000));
                param = [mac, nottime, op, ml, yesterdaystr];
                ctime=yesterdaystr;

                this.dbmgr
                .executeSql("select * from wetrecord where mac='"+mac+"' and  op='3' and record_time>'"+nottime12+"' order by record_time desc ",[])
                .then((ret2) => {
                    
                    if(ret2.rows.length==0){
                        this.dbmgr.executeSql("update wetrecord set record_date='"+todaystr+"' where mac='"+mac+"' and record_time>'"+nottime12+"'");
                    }else{
                        var record_time = ret2.rows.item(0).record_time;
                        this.dbmgr.executeSql("update wetrecord set record_date='"+todaystr+"' where mac='"+mac+"' and record_time>'"+record_time+"'");
                    }

                });;

            } else {
                param = [mac, nottime, op, ml, todaystr];
                ctime=todaystr;
            }
            this.dbmgr.executeSql("insert into wetrecord (mac,record_time,op,ml,record_date) values (?,?,?,?,?)", param).then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));;

        });
    }

    getWetRecord(mac, from, fromtime, to, totime) {

        if (this.dbmgr == null) {
            return;
        }

        var fromstr = from + " 0:0:0";
        var tostr = to + " 23:59:59";

        from=AppUtil.FormatDate2(new Date(fromtime));

        var sql = " select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' and '" + from + "'<=record_date and op in ('1','2','3') order by record_time ";
        if(from==to){
            sql=" select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' and '" + from + "'=record_date and op in ('1','2','3') order by  record_time ";
           // totime=fromtime+24 * 3600 * 1000;
        }
        //alert(sql);
        //sql=" select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' order by  record_time ";
        return this.dbmgr.executeSql(sql, []).then((data) => {

            var ret = [];
            for (var y = 0; y <= (totime - fromtime) / 24 / 3600 / 1000; y++) {
                var date = AppUtil.FormatDate(new Date(fromtime + y * 24 * 3600 * 1000));
                var cursor = -1;
                var r = { date: date, val: [] };
                var lastclick = null;
                var laststarttime="";
                var laststarttimef="";
                var laststarttimed="";
                for (var i = 0; i < data.rows.length; i++) {
                    var mac = data.rows.item(i).mac;
                    var record_time = data.rows.item(i).record_time;
                    var c_time = record_time.split(" ");
                    var record_time_formatting = c_time[1];
                    var record_date = data.rows.item(i).record_date;
                    var op = data.rows.item(i).op;
                    var ml = parseInt(data.rows.item(i).ml);
                    
                    console.log(op);
                    console.log(record_time);

                    if (record_date == date) {

                        if (op == "1") {
                           

                            if (lastclick == null ||
                                ((AppUtil.DateTimeStrToDate(record_time).getTime()
                                -AppUtil.DateTimeStrToDate(lastclick.record_time).getTime())>30000
                                )) {
                                cursor++;
                                lastclick = null;
                                laststarttime=record_time;
                                laststarttimef=record_time_formatting;
                                laststarttimed=record_date;
                            }


                        } else {
                            if (cursor > -1) {
                                if (r.val[cursor] == undefined) {
                                    r.val[cursor] = [];
                                    if(laststarttime==""){
                                        laststarttime=record_time;
                                    }
                                    if(laststarttimef==""){
                                        laststarttimef=record_time_formatting;
                                    }
                                    if(laststarttimed==""){
                                        laststarttimed=record_date;
                                    }
                                    r.val[cursor].push({ mac, record_time:laststarttime, record_time_formatting:laststarttimef, 
                                        record_date:laststarttimed, op:"1", ml:0 });
                                }
                                r.val[cursor].push({ mac, record_time, record_time_formatting, record_date, op, ml });
                                lastclick = r.val[cursor][r.val[cursor].length-1];
                            }
                        }
                    }
                }
                ret.push(r);
            }
            return ret;
        }).catch(e => {
            console.log(e);
            return e;
        });;

    }
    getFallRecord(mac, from, fromtime, to, totime) {

        if (this.dbmgr == null) {
            return;
        }
        var fromstr = from + " 0:0:0";
        var tostr = to + " 23:59:59";


        from=AppUtil.FormatDate2(new Date(fromtime));

        var sql = " select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' and '" + from + "'<=record_date   and op in ('4') order by  record_time ";
        if(from==to){
            sql=" select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' and '" + from + "'=record_date and op in ('4') order by  record_time ";
            //totime=fromtime+24 * 3600 * 1000;
        }
        //alert(sql);
        return this.dbmgr.executeSql(sql, []).then((data) => {


            var ret = [];
            for (var y = 0; y <= (totime - fromtime) / 24 / 3600 / 1000; y++) {
                var date = AppUtil.FormatDate(new Date(fromtime + y * 24 * 3600 * 1000));
                var cursor = -1;
                var r = { date: date, val: [] };
                for (var i = 0; i < data.rows.length; i++) {
                    var mac = data.rows.item(i).mac;
                    var record_time = data.rows.item(i).record_time;
                    var c_time = record_time.split(" ");
                    var record_time_formatting = c_time[1];
                    var record_date = data.rows.item(i).record_date;
                    var op = data.rows.item(i).op;
                    var ml = parseInt(data.rows.item(i).ml);
                    if (record_date == date) {
                        r.val.push({ mac, record_time, record_date, record_time_formatting, op, ml });
                    }
                }
                ret.push(r);
            }
            return ret;
        }).catch(e => {
            console.log(e);
            return e;
        });;


    }

}