import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ViewController, Item } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import Chart from 'chart.js';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DataMgr } from '../home/datamgr';
import { AppLang } from '../../app/app.lang';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage extends AppBase {
  @ViewChild('chart0') chart0: ElementRef;
  @ViewChild('chart1') chart1: ElementRef;
  @ViewChild('chart2') chart2: ElementRef;
  @ViewChild('chart3') chart3: ElementRef;
  currentTab = 0;

  chart0record = [];

  daterange = [];
  dt0 = [];
  ds0 = 0;
  dt1 = [];
  ds1 = 0;
  dt2 = [];
  ds2 = 0;
  dt3 = [];
  ds3 = 0;
  selectdeviceid = "";
  dbmgr: DataMgr = null;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController
    , public db: SQLite
  ) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar);
    this.dbmgr = new DataMgr(db);
  }

  onMyShow() {
    var that = this;
    this.daterange = [];
    var today = new Date();

    this.daterange.push({ datetext: this.Lang["day1"], from: this.util.FormatDate(today), to: this.util.FormatDate(today), fromtime: today.getTime(), totime: today.getTime() });
    this.daterange.push({ datetext: this.Lang["day7"], from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 7)), to: this.util.FormatDate(today), fromtime: today.getTime() - 24 * 3600 * 1000 * 7, totime: today.getTime() });
    this.daterange.push({ datetext: this.Lang["day14"], from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 14)), to: this.util.FormatDate(today), fromtime: today.getTime() - 24 * 3600 * 1000 * 14, totime: today.getTime() });
    this.daterange.push({ datetext: this.Lang["day30"], from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 30)), to: this.util.FormatDate(today), fromtime: today.getTime() - 24 * 3600 * 1000 * 30, totime: today.getTime() });



    try {

      //this.selectdeviceid = "aaa-cc-ccc-aaa";
      AppBase.Storage.get("selectdeviceid").then((id) => {
        this.selectdeviceid = id;

        //this.selectdeviceid = "aaa-cc-ccc-aaa";
        //alert(id);
        setTimeout(function () {

          that.loaddata();

        }, 2000);
      });
    } catch (ex) {

    }

  }
  loaddata() {
    //alert(this.ds0);

    //this.dbmgr.addWetRecord(this.selectdeviceid, this.currentTab + 1, (new Date()).getTime() % 1000);
    // return this.debug();

    //return;
    if (this.currentTab == 0) {
      //alert(this.daterange[this.ds0].to);
      //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
      this.dbmgr.getWetRecord(this.selectdeviceid, this.daterange[this.ds0].from, this.daterange[this.ds0].fromtime, this.daterange[this.ds0].to, this.daterange[this.ds0].totime)
        .then((ret) => {
          //alert(JSON.stringify(ret));
          this.dt0 = ret;
          var labels = [];
          var data = [];
          var ft = "";
          var option = null;

          option = {
            scales: {
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'ml'
                },
                ticks: {
                  min: 0,
                  // forces step size to be 5 units
                  stepSize: 200
                }
              }],
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    hour: 'H:00',
                    minute: 'H:M',
                    day: "M-D"
                  }
                }
              }]
            }
          }

          for (let da of ret) {
            //labels.push(da.date);
            //var d = da.val.length;
            //data.push(d);
            var havedata = false;
            for (let dt of da.val) {
              if (dt != null && dt.length > 1) {
                var time = dt[dt.length - 1].record_time;
                var dtobj = this.util.DateTimeStrToDate(time);
                data.push({ x: dtobj, y: dt[dt.length - 1].ml });
                havedata = true;
              }
            }
            if (havedata == false) {
              var dtobj = this.util.DateTimeStrToDate(da.date + " 0:0:0");
              data.push({ x: dtobj, y: 0 });
              dtobj = this.util.DateTimeStrToDate(da.date + " 23:59:59");
              data.push({ x: dtobj, y: 0 });
            }

          }

          Chart.Line(this.chart0.nativeElement.getContext("2d"), {
            type: 'bar',
            data: {
              datasets: [{
                label: this.Lang["record_1"],
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1, pointHitRadius: 20,
              }]
            },
            options: option
          });





        });


    } else if (this.currentTab == 1) {

      //alert(this.daterange[this.ds0].to);
      //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
      this.dbmgr.getFallRecord(this.selectdeviceid, this.daterange[this.ds1].from, this.daterange[this.ds1].fromtime, this.daterange[this.ds1].to, this.daterange[this.ds1].totime)
        .then((ret) => {
          this.dt1 = ret;
          var labels = [];
          var data = [];
          var ft = "";


          ft = this.daterange[this.ds1].from + "到" + this.daterange[this.ds1].to;
          for (let da of ret) {
            labels.push(da.date);
            data.push(da.val.length);
          }


          Chart.Bar(this.chart1.nativeElement.getContext("2d"), {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: this.Lang["record_2"],
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: this.Lang["ci"]
                  },
                  ticks: {
                    min: 0,
                    // forces step size to be 5 units
                    stepSize: 3
                  }
                }]
              }
            }
          });


        });
    } else if (this.currentTab == 2) {

      //alert(this.daterange[this.ds0].to);
      //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
      this.dbmgr.getWetRecord(this.selectdeviceid, this.daterange[this.ds2].from, this.daterange[this.ds2].fromtime, this.daterange[this.ds2].to, this.daterange[this.ds2].totime)
        .then((ret) => {
          this.dt2 = ret;
          var labels = [];
          var data = [];
          var ft = "";


          ft = this.daterange[this.ds2].from + this.Lang["dao"] + this.daterange[this.ds2].to;
          for (let da of ret) {
            labels.push(da.date);

            data.push(da.val.length);
          }



          Chart.Bar(this.chart2.nativeElement.getContext("2d"), {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: this.Lang["record_3"],
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: this.Lang["ci"]
                  },
                  ticks: {
                    min: 0,
                    // forces step size to be 5 units
                    stepSize: 5
                  }
                }]
              }
            }
          });


        });
    } else if (this.currentTab == 3) {

      //alert(this.daterange[this.ds0].to);
      //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
      this.dbmgr.getWetRecord(this.selectdeviceid, this.daterange[this.ds3].from, this.daterange[this.ds3].fromtime, this.daterange[this.ds3].to, this.daterange[this.ds3].totime)
        .then((ret) => {
          this.dt3 = ret;
          var labels = [];
          var data = [];
          var ft = "";

          ft = this.daterange[this.ds3].from + this.Lang["dao"] + this.daterange[this.ds3].to;
          for (let da of ret) {
            var d = 0;

            for (let item of da.val) {
              //alert(JSON.stringify());

              if (item != null && item != undefined && item.length > 1) {
                d += parseInt(item[item.length - 1].ml);
              }
            }
            da.ml = d;
          }


          var option = {
            scales: {
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'ml'
                },
                ticks: {
                  min: 0,
                  // forces step size to be 5 units
                  stepSize: 500
                }
              }],
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    hour: 'H:00',
                    minute: 'H:M',
                    day: "M-D"
                  }
                }
              }]
            }
          }
          if (this.daterange[this.ds3].from != this.daterange[this.ds3].to) {
            for (let da of ret) {
              labels.push(da.date);
              var d = 0;
              for (let item of da.val) {
                //alert(JSON.stringify());
                if (item != null && item != undefined && item.length > 1) {
                  d += parseInt(item[item.length - 1].ml);
                }
              }
              var dtobj = this.util.DateTimeStrToDate(da.date + " 0:0:0");
              data.push({ x: dtobj, y: d });
            }

          } else {

            for (let da of ret) {
              labels.push(da.date);
              var d = 0;
              for (var i = 0; i <= 23; i++) {
                for (let dt of da.val) {
                  if (dt != null && dt.length > 1) {
                    var time = dt[dt.length - 1].record_time;
                    var dtobj = this.util.DateTimeStrToDate(time);
                    if (dtobj.getHours() == i) {
                      d += parseInt(dt[dt.length - 1].ml);
                    }
                  }
                }
                var dtobj = this.util.DateTimeStrToDate(da.date + " " + (i + 1).toString() + ":0:0");
                data.push({ x: dtobj, y: d });
              }
            }

          }


          Chart.Line(this.chart3.nativeElement.getContext("2d"), {
            type: 'bar',
            data: {
              datasets: [{
                label: this.Lang["record_4"],
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: option
          });





        });
    }
  }

  debug() {

    var option = {
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'ml'
          },
          ticks: {
            min: 0,
            // forces step size to be 5 units
            stepSize: 200
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              hour: 'H:00',
              minute: 'H:M',
              day: "M-D"
            }
          }
        }]
      }
    };

    var data = [];
    for (var j = 0; j < 7; j++) {
      for (var i = 0; i < 12; i++) {
        var now = new Date().getTime() * Math.random();
        var t = new Date(2018, 8, j, i + 2, now % 60, 0);
        data.push({ t: t, y: now % 1000 });
      }
    }
    console.log(data);
    Chart.Line(this.chart0.nativeElement.getContext("2d"), {
      type: 'bar',
      data: {
        datasets: [{
          fill: true,
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: option
    });
    return;
  }

}