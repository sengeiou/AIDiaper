import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import Chart from 'chart.js';
import { RecordApi } from '../../providers/record.api';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [RecordApi]
})
export class AboutPage extends AppBase {
  @ViewChild('chart0') chart0: ElementRef;
  @ViewChild('chart1') chart1: ElementRef;
  @ViewChild('chart2') chart2: ElementRef;
  @ViewChild('chart3') chart3: ElementRef;
  currentTab = 3;

  chart0record = [];

  daterange = [];
  dt0 = [];
  ds0 = 1;
  dt1 = [];
  ds1 = 1;
  dt2 = [];
  ds2 = 1;
  dt3 = [];
  ds3 = 1;
  selectdeviceid = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController
    , public recordapi: RecordApi
  ) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar);
  }

  onMyShow() {
    var that = this;
    this.daterange = [];
    var today = new Date();

    this.daterange.push({ datetext: "当日", from: this.util.FormatDate(today), to: this.util.FormatDate(today) });
    this.daterange.push({ datetext: "近7日", from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 7)), to: this.util.FormatDate(today) });
    this.daterange.push({ datetext: "近14日", from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 14)), to: this.util.FormatDate(today) });
    this.daterange.push({ datetext: "近30日", from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 30)), to: this.util.FormatDate(today) });


    try {
      AppBase.Storage.get("selectdeviceid").then((id) => {
        this.selectdeviceid = id;
        //alert(id);
        this.selectdeviceid = "aaa-cc-ccc-aaa";
        that.loaddata();
      });
    } catch (ex) {

    }




  }
  loaddata() {
    //alert(this.ds0);
    if (this.currentTab == 0) {
      //alert(this.daterange[this.ds0].to);
      //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
      this.recordapi.wetting({ mac: this.selectdeviceid, from: this.daterange[this.ds0].from, to: this.daterange[this.ds0].to })
        .then((ret) => {
          this.dt0 = ret;
          var labels = [];
          var data = [];
          var ft = "";
          ft = this.daterange[this.ds0].from + "到" + this.daterange[this.ds0].to;
          for (let da of ret) {
            labels.push(da.date);
            var d = da.val.length;
            data.push(d);
          }

          Chart.Line(this.chart0.nativeElement.getContext("2d"), {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: ft,
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
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });





        });


    } else if (this.currentTab == 1) {

      //alert(this.daterange[this.ds0].to);
      //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
      this.recordapi.falling({ mac: this.selectdeviceid, from: this.daterange[this.ds1].from, to: this.daterange[this.ds1].to })
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


          Chart.Line(this.chart1.nativeElement.getContext("2d"), {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: ft,
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
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });


        });
    } else if (this.currentTab == 2) {

      //alert(this.daterange[this.ds0].to);
      //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
      this.recordapi.wetting({ mac: this.selectdeviceid, from: this.daterange[this.ds2].from, to: this.daterange[this.ds2].to })
        .then((ret) => {
          this.dt2 = ret;
          var labels = [];
          var data = [];
          var ft = "";


          ft = this.daterange[this.ds2].from + "到" + this.daterange[this.ds2].to;
          for (let da of ret) {
            labels.push(da.date);

            data.push(da.val.length);
          }


          Chart.Line(this.chart2.nativeElement.getContext("2d"), {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: ft,
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
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });


        });
    } else if (this.currentTab == 3) {

      //alert(this.daterange[this.ds0].to);
      //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
      this.recordapi.wetting({ mac: this.selectdeviceid, from: this.daterange[this.ds3].from, to: this.daterange[this.ds3].to })
        .then((ret) => {
          this.dt3 = ret;
          var labels = [];
          var data = [];
          var ft = "";


          ft = this.daterange[this.ds3].from + "到" + this.daterange[this.ds3].to;
          for (let da of ret) {
            labels.push(da.date);
            var d=0;
            for (let item of da.val) {
              //alert(JSON.stringify());
              if (item.length > 0) {
                d += parseInt(item[item.length - 1].ml);
              }
            }
            da.ml=d;
            data.push(d);
          }


          Chart.Line(this.chart3.nativeElement.getContext("2d"), {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: ft,
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
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });


        });
    }
  }

}