webpackJsonp([0],{

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScanPageModule", function() { return ScanPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan__ = __webpack_require__(477);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ScanPageModule = /** @class */ (function () {
    function ScanPageModule() {
    }
    ScanPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__scan__["a" /* ScanPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__scan__["a" /* ScanPage */]),
            ],
        })
    ], ScanPageModule);
    return ScanPageModule;
}());

//# sourceMappingURL=scan.module.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_base__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_ble__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_audio__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_aidevice__ = __webpack_require__(349);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScanPage = /** @class */ (function (_super) {
    __extends(ScanPage, _super);
    function ScanPage(navCtrl, modalCtrl, statusBar, viewCtrl, localNotifications, ble, nativeAudio) {
        var _this = _super.call(this, navCtrl, modalCtrl, viewCtrl, statusBar) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.statusBar = statusBar;
        _this.viewCtrl = viewCtrl;
        _this.localNotifications = localNotifications;
        _this.ble = ble;
        _this.nativeAudio = nativeAudio;
        _this.devicelist = [];
        _this.selectdeviceid = "";
        return _this;
    }
    ScanPage.prototype.callnotify = function () {
        // this.nativeAudio.play('fall');
        // this.localNotifications.schedule({
        //   text: "测试铃声",
        //   vibrate: true
        // }); 
    };
    ScanPage.prototype.onMyShow = function () {
        var _this = this;
        this.ble.isEnabled().then(function () {
        }, function () {
            _this.ble.enable();
        });
        if (__WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].IsMobileWeb) {
            this.myslider.stopAutoplay();
            this.devicelist.push({ name: "test", id: "test:test:test:test", advertising: {}, riis: 100, data: "~~~" });
            this.myslider.slideNext();
        }
        else {
            if (this.ble.isEnabled) {
                this.tryScan();
            }
            else {
                var that = this;
                this.ble.enable().then(function () {
                    that.tryScan();
                });
            }
        }
        try {
            __WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].Storage.get("selectdeviceid").then(function (id) {
                _this.selectdeviceid = id;
            });
        }
        catch (ex) {
        }
    };
    ScanPage.prototype.tryScan = function () {
        var _this = this;
        this.ble.startScanWithOptions([], { reportDuplicates: false }).subscribe(function (device) {
            var isclick = false;
            if (device.advertising != undefined) {
                var scanRecord = device.advertising.split(",");
                var Version = __WEBPACK_IMPORTED_MODULE_7__home_aidevice__["a" /* AIDevice */].GetVersion(scanRecord);
                var mlength = __WEBPACK_IMPORTED_MODULE_7__home_aidevice__["a" /* AIDevice */].GetwholeDatelength(Version);
                if (scanRecord.length < mlength) {
                    return;
                }
                var mData = [];
                if (Version == 0) {
                    mData = Array(7);
                }
                else if (Version == 1) {
                    mData = Array(7);
                }
                else if (Version == 2) {
                    mData = Array(8);
                }
                //						mTimeOutHandler.removeCallbacks(mThreadTimeOut);
                //						runOnUiThread(capEnter);
                var mdataPosition = __WEBPACK_IMPORTED_MODULE_7__home_aidevice__["a" /* AIDevice */].GetDataPosition(Version);
                for (var i = mdataPosition; i < (mData.length + mdataPosition); i++) {
                    mData[i - mdataPosition] = scanRecord[i];
                }
                //alert(mdataPosition);
                //alert(JSON.stringify(mData));
                if (mData[0] == 0x00 || mData[14] == 0x00) {
                }
                else {
                    isclick = true;
                }
            }
            //alert(isclick?"clicked":"no click");
            if (device.name != undefined && device.name == " LN-200c" && isclick == true) {
                if (__WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].research == false && device.id == _this.selectdeviceid) {
                    _this.selectDevice(device);
                }
                device.data = JSON.stringify(device);
                var advertising = device.advertising;
                var scanRecord = device.advertising.split(",");
                device.clicked = scanRecord[14] != 0x00;
                var havedevice = false;
                for (var i = 0; i < _this.devicelist.length; i++) {
                    if (device.id == _this.devicelist[i].id) {
                        _this.devicelist[i] = device;
                        havedevice = true;
                        break;
                    }
                }
                if (havedevice == false) {
                    _this.devicelist.push(device);
                }
                _this.devicelist.sort(function (a, b) {
                    return parseInt(a.rssi) < parseInt(b.rssi) ? 1 : -1;
                });
                _this.myslider.slideTo(1);
                //this.ble.stopScan();
                //this.close(device);
            }
        }, function (error) {
            alert(error);
        }, function () {
        });
    };
    ScanPage.prototype.selectDevice = function (device) {
        __WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].research = false;
        __WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].Storage.set("selectdeviceid", device.id);
        this.close(device);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("myslider"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
    ], ScanPage.prototype, "myslider", void 0);
    ScanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scan',template:/*ion-inline-start:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/scan/scan.html"*/'<!--\n  Generated template for the ScanPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n  <ion-slides pager #myslider >\n\n    <ion-slide >\n      <h2 (click)="callnotify()">{{Lang[\'findingsensor\']}}</h2>\n    </ion-slide>\n  \n    <ion-slide >\n      <div class="h3">\n          {{Lang[\'findandclick\']}}\n      </div>\n      <div *ngFor="let item of devicelist;let i=index;" class="deviceitem margin-top padding-20 white-block"\n       (click)="selectDevice(item)">\n       <div class="flex-row flex-bottom" >\n        <div >{{Lang[\'devicename\']}}：{{item.name}}</div>\n        <div class="h6 txt-primary text-right flex-1">{{Lang[\'status\']}}：{{item.clicked?Lang[\'clicked\']:Lang[\'opened\']}}</div>\n       </div>\n        <div class="flex-row" >\n          <div class="h6 txt-gray">{{Lang[\'address\']}}：{{item.id}}</div>\n          <div class="h6 txt-gray text-right flex-1">{{Lang[\'signal\']}}：{{item.rssi}}</div>\n        </div>\n        <!--\n        <div class="h6">\n          {{item.data}}\n        </div>-->\n      </div>\n    </ion-slide>\n\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/scan/scan.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], ScanPage);
    return ScanPage;
}(__WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */]));

//# sourceMappingURL=scan.js.map

/***/ })

});
//# sourceMappingURL=0.js.map