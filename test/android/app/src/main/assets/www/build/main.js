webpackJsonp([1],{

/***/ 125:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/scan/scan.module": [
		476,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);


var ApiConfig = /** @class */ (function () {
    function ApiConfig() {
    }
    ApiConfig.getApiUrl = function () {
        return "https://cmsdev.app-link.org/alucard263096/aidiaper/api/";
    };
    ApiConfig.getUploadPath = function () {
        return "https://alioss.app-link.org/alucard263096/aidiaper/";
    };
    ApiConfig.getFileUploadAPI = function () {
        return "https://cmsdev.app-link.org/alucard263096/aidiaper/fileupload";
    };
    ApiConfig.getDataBaseName = function () {
        return "alucard263096_aidiaper.db";
    };
    ApiConfig.ParamUrlencoded = function (json) {
        var arr = new Array();
        for (var i in json) {
            arr.push(i + "=" + encodeURIComponent(json[i]));
        }
        return arr.join("&");
    };
    ApiConfig.GetHeader = function (url, postparam) {
        var sign = "";
        var fmd5str = "";
        if (ApiConfig.TOKEN != null && ApiConfig.RID != null) {
            var arr = new Array();
            for (var i in postparam) {
                arr.push(i);
            }
            var sorrtedArray = arr.sort(function (n1, n2) { return (n1 > n2) ? 1 : 0; });
            var jsonarr = new Array();
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var i = arr_1[_i];
                jsonarr[i] = postparam[i];
            }
            var poststrarr = new Array();
            for (var i in jsonarr) {
                var str = jsonarr[i].toString();
                str = str.replace(/[\-|\~|\_|\.|\!|\~|\*|\'|\(|\)]/g, "");
                str = encodeURIComponent(str);
                poststrarr.push(i + "=" + str);
            }
            var poststr = poststrarr.join("&");
            var md5str = url + "~" + poststr + "~" + ApiConfig.TOKEN + "~" + ApiConfig.RID;
            md5str = md5str.toUpperCase();
            fmd5str = md5str + ApiConfig.MDSalt;
            console.log(fmd5str);
            sign = md5.hex_md5(md5str + ApiConfig.MDSalt);
            console.log(sign);
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Sign': sign,
            'TokenKey': ApiConfig.RID,
            'Fmd5str': fmd5str
        });
        return headers;
    };
    ApiConfig.SetToken = function (token, rid) {
        ApiConfig.TOKEN = token;
        ApiConfig.RID = rid;
    };
    ApiConfig.MD5 = function (str) {
        return md5.hex_md5(str);
    };
    ApiConfig.SetLoadingCtrl = function (loadCtrl) {
        ApiConfig.LoadingCtrl = loadCtrl;
    };
    ApiConfig.GetLoadingModal = function () {
        var ctrl = ApiConfig.LoadingCtrl;
        if (ctrl != null && ApiConfig.loading == null) {
            ApiConfig.loadingQueueCount = 0;
            ApiConfig.loading = ctrl.create({
                spinner: 'ios',
                //cssClass: 'myloading',
                duration: 10000
            });
            ApiConfig.loading.present();
        }
        ApiConfig.loadingQueueCount++;
        return null;
    };
    ApiConfig.DimissLoadingModal = function () {
        try {
            ApiConfig.loadingQueueCount--;
            if (ApiConfig.loading != null && ApiConfig.loadingQueueCount == 0) {
                ApiConfig.loading.dismiss();
                ApiConfig.loading = null;
                ApiConfig.loadingQueueCount = 0;
            }
        }
        catch (e) {
        }
    };
    ApiConfig.ForceDimissLoadingModal = function () {
        try {
            if (ApiConfig.loading != null) {
                ApiConfig.loading.dismiss();
                ApiConfig.loading = null;
                ApiConfig.loadingQueueCount = 0;
            }
        }
        catch (e) {
        }
    };
    ApiConfig.DataLoadedHandle = function (url, post, data) {
        try {
            data = data.json();
            if (data.code != null) {
                if (data.code == "404" || data.code == "401" || data.code == "500") {
                    console.error(data.return.debuggenSign);
                    console.error(data.return.genSign);
                    return false;
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    };
    ApiConfig.ErrorHandle = function (url, post, error) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(error.json().error || 'Server Error').toPromise();
    };
    ApiConfig.TOKEN = null;
    ApiConfig.RID = null;
    ApiConfig.MDSalt = "";
    ApiConfig.LoadingCtrl = null;
    ApiConfig.loading = null;
    ApiConfig.loadingQueueCount = 0;
    return ApiConfig;
}());

var md5 = /** @class */ (function () {
    function md5() {
    }
    /*
     * These are the public statics you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    md5.hex_md5 = function (s) { return md5.binl2hex(md5.core_md5(md5.str2binl(s), s.length * md5.chrsz)); };
    md5.b64_md5 = function (s) { return md5.binl2b64(md5.core_md5(md5.str2binl(s), s.length * md5.chrsz)); };
    md5.str_md5 = function (s) { return md5.binl2str(md5.core_md5(md5.str2binl(s), s.length * md5.chrsz)); };
    md5.hex_hmac_md5 = function (key, data) { return md5.binl2hex(md5.core_hmac_md5(key, data)); };
    md5.b64_hmac_md5 = function (key, data) { return md5.binl2b64(md5.core_hmac_md5(key, data)); };
    md5.str_hmac_md5 = function (key, data) { return md5.binl2str(md5.core_hmac_md5(key, data)); };
    /*
     * Perform a simple self-test to see if the VM is working
     */
    md5.md5_vm_test = function () {
        return md5.hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
    };
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length
     */
    md5.core_md5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = md5.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = md5.safe_add(a, olda);
            b = md5.safe_add(b, oldb);
            c = md5.safe_add(c, oldc);
            d = md5.safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    };
    /*
     * These public statics implement the four basic operations the algorithm uses.
     */
    md5.md5_cmn = function (q, a, b, x, s, t) {
        return md5.safe_add(md5.bit_rol(md5.safe_add(md5.safe_add(a, q), md5.safe_add(x, t)), s), b);
    };
    md5.md5_ff = function (a, b, c, d, x, s, t) {
        return md5.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    md5.md5_gg = function (a, b, c, d, x, s, t) {
        return md5.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    md5.md5_hh = function (a, b, c, d, x, s, t) {
        return md5.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    md5.md5_ii = function (a, b, c, d, x, s, t) {
        return md5.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
     * Calculate the HMAC-MD5, of a key and some data
     */
    md5.core_hmac_md5 = function (key, data) {
        var bkey = md5.str2binl(key);
        if (bkey.length > 16)
            bkey = md5.core_md5(bkey, key.length * md5.chrsz);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = md5.core_md5(ipad.concat(md5.str2binl(data)), 512 + data.length * md5.chrsz);
        return md5.core_md5(opad.concat(hash), 512 + 128);
    };
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    md5.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    md5.bit_rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    /*
     * Convert a string to an array of little-endian words
     * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
     */
    md5.str2binl = function (str) {
        var bin = Array();
        var mask = (1 << md5.chrsz) - 1;
        for (var i = 0; i < str.length * md5.chrsz; i += md5.chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / md5.chrsz) & mask) << (i % 32);
        return bin;
    };
    /*
     * Convert an array of little-endian words to a string
     */
    md5.binl2str = function (bin) {
        var str = "";
        var mask = (1 << md5.chrsz) - 1;
        for (var i = 0; i < bin.length * 32; i += md5.chrsz)
            str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
        return str;
    };
    /*
     * Convert an array of little-endian words to a hex string.
     */
    md5.binl2hex = function (binarray) {
        var hex_tab = md5.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    };
    /*
     * Convert an array of little-endian words to a base-64 string
     */
    md5.binl2b64 = function (binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i += 3) {
            var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
                | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
                | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > binarray.length * 32)
                    str += md5.b64pad;
                else
                    str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
            }
        }
        return str;
    };
    /*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
    md5.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
    md5.b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    md5.chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */
    return md5;
}());
//# sourceMappingURL=api.config.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppUtil; });
var AppUtil = /** @class */ (function () {
    function AppUtil() {
    }
    AppUtil.HtmlDecode = function (str) {
        if (str == null) {
            return "";
        }
        var s = "";
        if (str.length == 0)
            return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        var reg = new RegExp("\"/alucard263096/zhizhenapp/upload/", "g"); //创建正则RegExp对象   
        s = s.replace(reg, "\"http://cmsdev.app-link.org/alucard263096/zhizhenapp/upload/");
        return s;
    };
    AppUtil.Toast = function (toastCtrl, msg) {
        var toast = toastCtrl.create({
            message: msg
        });
        toast.present();
    };
    AppUtil.FormatDateTime = function (val) {
        var monthstr = (val.getMonth() + 1) > 9 ? (val.getMonth() + 1).toString() : "0" + (val.getMonth() + 1).toString();
        var datestr = (val.getDate()) > 9 ? (val.getDate()).toString() : "0" + (val.getDate()).toString();
        var hourstr = (val.getHours()) > 9 ? (val.getHours()).toString() : "0" + (val.getHours()).toString();
        var minstr = (val.getMinutes()) > 9 ? (val.getMinutes()).toString() : "0" + (val.getMinutes()).toString();
        var secstr = (val.getSeconds()) > 9 ? (val.getSeconds()).toString() : "0" + (val.getSeconds()).toString();
        return val.getFullYear() + "-" + monthstr + "-" + datestr +
            " " + hourstr + ":" + minstr + ":" + secstr;
    };
    AppUtil.IsMobileNo = function (str) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return myreg.test(str);
    };
    AppUtil.FormatPercent = function (val) {
        val = val * 100.0;
        return val.toFixed(2) + '%';
    };
    AppUtil.FormatPrice = function (val) {
        val = val * 1.0;
        return val.toFixed(2);
    };
    AppUtil.FormatNumber = function (val, digits) {
        val = val * 1.0;
        return val.toFixed(digits);
    };
    AppUtil.FormatDate = function (val) {
        var monthstr = (val.getMonth() + 1) > 9 ? (val.getMonth() + 1).toString() : "0" + (val.getMonth() + 1).toString();
        var datestr = (val.getDate()) > 9 ? (val.getDate()).toString() : "0" + (val.getDate()).toString();
        return val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate();
    };
    AppUtil.DateTimeStrToDate = function (datetimestr) {
        var s1 = datetimestr.split(" ");
        var datestr = s1[0];
        var timestr = s1[1];
        var date = datestr.split("-");
        var time = timestr.split(":");
        var year = parseInt(date[0]);
        var month = parseInt(date[1]);
        var day = parseInt(date[2]);
        var hour = parseInt(time[0]);
        var minute = parseInt(time[1]);
        var second = parseInt(time[2]);
        return new Date(year, month - 1, day, hour, minute, second);
    };
    AppUtil.MiddleToast = function (toastCtrl, msg) {
        var toast = toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    };
    AppUtil.isMicroMessager = false; //是否是在微信内置浏览器打开.
    AppUtil.isLessThenAndroid5 = false; //<= android 4.4
    AppUtil.isIOS = false; //是否是在Iphone设备, 不论是微信打开,还是APP.
    AppUtil.osVersion = '';
    return AppUtil;
}());

//# sourceMappingURL=app.util.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_contact__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mall_mall__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_base__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_lang__ = __webpack_require__(57);
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









var TabsPage = /** @class */ (function (_super) {
    __extends(TabsPage, _super);
    function TabsPage(navCtrl, modalCtrl, statusBar, viewCtrl) {
        var _this = _super.call(this, navCtrl, modalCtrl, viewCtrl, statusBar) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.statusBar = statusBar;
        _this.viewCtrl = viewCtrl;
        _this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        _this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__about_about__["a" /* AboutPage */];
        _this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__contact_contact__["a" /* ContactPage */];
        _this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__mall_mall__["a" /* MallPage */];
        return _this;
    }
    TabsPage.prototype.onMyShow = function () {
        this.Lang = __WEBPACK_IMPORTED_MODULE_8__app_app_lang__["a" /* AppLang */].getLang(__WEBPACK_IMPORTED_MODULE_6__app_app_base__["a" /* AppBase */].Setting.lang);
    };
    TabsPage.prototype.reloadlang = function () {
        //alert(1);
        this.Lang = __WEBPACK_IMPORTED_MODULE_8__app_app_lang__["a" /* AppLang */].Lang;
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/tabs/tabs.html"*/'<ion-tabs (ionChange)="reloadlang()" >\n    <ion-tab [root]="tab1Root" tabTitle="&nbsp;{{Lang.home}}&nbsp;" tabIcon="home"  ></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="&nbsp;{{Lang.history}}&nbsp;" tabIcon="stats" ></ion-tab>\n    <ion-tab [root]="tab4Root" tabTitle="&nbsp;{{Lang.mall}}&nbsp;" tabIcon="cart"  ></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="&nbsp;{{Lang.setting}}&nbsp;" tabIcon="settings"  ></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], TabsPage);
    return TabsPage;
}(__WEBPACK_IMPORTED_MODULE_6__app_app_base__["a" /* AppBase */]));

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_base__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_datamgr__ = __webpack_require__(340);
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







var AboutPage = /** @class */ (function (_super) {
    __extends(AboutPage, _super);
    function AboutPage(navCtrl, modalCtrl, statusBar, viewCtrl, db) {
        var _this = _super.call(this, navCtrl, modalCtrl, viewCtrl, statusBar) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.statusBar = statusBar;
        _this.viewCtrl = viewCtrl;
        _this.db = db;
        _this.currentTab = 0;
        _this.chart0record = [];
        _this.daterange = [];
        _this.dt0 = [];
        _this.ds0 = 0;
        _this.dt1 = [];
        _this.ds1 = 0;
        _this.dt2 = [];
        _this.ds2 = 0;
        _this.dt3 = [];
        _this.ds3 = 0;
        _this.selectdeviceid = "";
        _this.dbmgr = null;
        _this.dbmgr = new __WEBPACK_IMPORTED_MODULE_6__home_datamgr__["a" /* DataMgr */](db);
        return _this;
    }
    AboutPage.prototype.onMyShow = function () {
        var _this = this;
        var that = this;
        this.daterange = [];
        var today = new Date();
        this.daterange.push({ datetext: this.Lang["day1"], from: this.util.FormatDate(today), to: this.util.FormatDate(today), fromtime: today.getTime(), totime: today.getTime() });
        this.daterange.push({ datetext: this.Lang["day7"], from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 7)), to: this.util.FormatDate(today), fromtime: today.getTime() - 24 * 3600 * 1000 * 7, totime: today.getTime() });
        this.daterange.push({ datetext: this.Lang["day14"], from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 14)), to: this.util.FormatDate(today), fromtime: today.getTime() - 24 * 3600 * 1000 * 14, totime: today.getTime() });
        this.daterange.push({ datetext: this.Lang["day30"], from: this.util.FormatDate(new Date(today.getTime() - 24 * 3600 * 1000 * 30)), to: this.util.FormatDate(today), fromtime: today.getTime() - 24 * 3600 * 1000 * 30, totime: today.getTime() });
        try {
            //this.selectdeviceid = "aaa-cc-ccc-aaa";
            __WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].Storage.get("selectdeviceid").then(function (id) {
                _this.selectdeviceid = id;
                //this.selectdeviceid = "aaa-cc-ccc-aaa";
                //alert(id);
                setTimeout(function () {
                    that.loaddata();
                }, 2000);
            });
        }
        catch (ex) {
        }
    };
    AboutPage.prototype.loaddata = function () {
        //alert(this.ds0);
        var _this = this;
        //this.dbmgr.addWetRecord(this.selectdeviceid, this.currentTab + 1, (new Date()).getTime() % 1000);
        // return this.debug();
        //return;
        if (this.currentTab == 0) {
            //alert(this.daterange[this.ds0].to);
            //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
            this.dbmgr.getWetRecord(this.selectdeviceid, this.daterange[this.ds0].from, this.daterange[this.ds0].fromtime, this.daterange[this.ds0].to, this.daterange[this.ds0].totime)
                .then(function (ret) {
                //alert(JSON.stringify(ret));
                _this.dt0 = ret;
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
                };
                for (var _i = 0, ret_1 = ret; _i < ret_1.length; _i++) {
                    var da = ret_1[_i];
                    //labels.push(da.date);
                    //var d = da.val.length;
                    //data.push(d);
                    var havedata = false;
                    for (var _a = 0, _b = da.val; _a < _b.length; _a++) {
                        var dt = _b[_a];
                        if (dt != null && dt.length > 1) {
                            var time = dt[dt.length - 1].record_time;
                            var dtobj = _this.util.DateTimeStrToDate(time);
                            data.push({ x: dtobj, y: dt[dt.length - 1].ml });
                            havedata = true;
                        }
                    }
                    if (havedata == false) {
                        var dtobj = _this.util.DateTimeStrToDate(da.date + " 0:0:0");
                        data.push({ x: dtobj, y: 0 });
                        dtobj = _this.util.DateTimeStrToDate(da.date + " 23:59:59");
                        data.push({ x: dtobj, y: 0 });
                    }
                }
                __WEBPACK_IMPORTED_MODULE_4_chart_js___default.a.Line(_this.chart0.nativeElement.getContext("2d"), {
                    type: 'bar',
                    data: {
                        datasets: [{
                                label: _this.Lang["record_1"],
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
        }
        else if (this.currentTab == 1) {
            //alert(this.daterange[this.ds0].to);
            //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
            this.dbmgr.getFallRecord(this.selectdeviceid, this.daterange[this.ds1].from, this.daterange[this.ds1].fromtime, this.daterange[this.ds1].to, this.daterange[this.ds1].totime)
                .then(function (ret) {
                _this.dt1 = ret;
                var labels = [];
                var data = [];
                var ft = "";
                ft = _this.daterange[_this.ds1].from + "到" + _this.daterange[_this.ds1].to;
                for (var _i = 0, ret_2 = ret; _i < ret_2.length; _i++) {
                    var da = ret_2[_i];
                    labels.push(da.date);
                    data.push(da.val.length);
                }
                __WEBPACK_IMPORTED_MODULE_4_chart_js___default.a.Bar(_this.chart1.nativeElement.getContext("2d"), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                                label: _this.Lang["record_2"],
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
                                        labelString: _this.Lang["ci"]
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
        }
        else if (this.currentTab == 2) {
            //alert(this.daterange[this.ds0].to);
            //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
            this.dbmgr.getWetRecord(this.selectdeviceid, this.daterange[this.ds2].from, this.daterange[this.ds2].fromtime, this.daterange[this.ds2].to, this.daterange[this.ds2].totime)
                .then(function (ret) {
                _this.dt2 = ret;
                var labels = [];
                var data = [];
                var ft = "";
                ft = _this.daterange[_this.ds2].from + _this.Lang["dao"] + _this.daterange[_this.ds2].to;
                for (var _i = 0, ret_3 = ret; _i < ret_3.length; _i++) {
                    var da = ret_3[_i];
                    labels.push(da.date);
                    data.push(da.val.length);
                }
                __WEBPACK_IMPORTED_MODULE_4_chart_js___default.a.Bar(_this.chart2.nativeElement.getContext("2d"), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                                label: _this.Lang["record_3"],
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
                                        labelString: _this.Lang["ci"]
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
        }
        else if (this.currentTab == 3) {
            //alert(this.daterange[this.ds0].to);
            //alert(JSON.stringify({mac:this.selectdeviceid,from:this.daterange[this.ds0].from,to:this.daterange[this.ds0].to}));
            this.dbmgr.getWetRecord(this.selectdeviceid, this.daterange[this.ds3].from, this.daterange[this.ds3].fromtime, this.daterange[this.ds3].to, this.daterange[this.ds3].totime)
                .then(function (ret) {
                _this.dt3 = ret;
                var labels = [];
                var data = [];
                var ft = "";
                ft = _this.daterange[_this.ds3].from + _this.Lang["dao"] + _this.daterange[_this.ds3].to;
                for (var _i = 0, ret_4 = ret; _i < ret_4.length; _i++) {
                    var da = ret_4[_i];
                    var d = 0;
                    for (var _a = 0, _b = da.val; _a < _b.length; _a++) {
                        var item = _b[_a];
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
                };
                if (_this.daterange[_this.ds3].from != _this.daterange[_this.ds3].to) {
                    for (var _c = 0, ret_5 = ret; _c < ret_5.length; _c++) {
                        var da = ret_5[_c];
                        labels.push(da.date);
                        var d = 0;
                        for (var _d = 0, _e = da.val; _d < _e.length; _d++) {
                            var item = _e[_d];
                            //alert(JSON.stringify());
                            if (item != null && item != undefined && item.length > 1) {
                                d += parseInt(item[item.length - 1].ml);
                            }
                        }
                        var dtobj = _this.util.DateTimeStrToDate(da.date + " 0:0:0");
                        data.push({ x: dtobj, y: d });
                    }
                }
                else {
                    for (var _f = 0, ret_6 = ret; _f < ret_6.length; _f++) {
                        var da = ret_6[_f];
                        labels.push(da.date);
                        var d = 0;
                        for (var i = 0; i <= 23; i++) {
                            for (var _g = 0, _h = da.val; _g < _h.length; _g++) {
                                var dt = _h[_g];
                                if (dt != null && dt.length > 1) {
                                    var time = dt[dt.length - 1].record_time;
                                    var dtobj = _this.util.DateTimeStrToDate(time);
                                    if (dtobj.getHours() == i) {
                                        d += parseInt(dt[dt.length - 1].ml);
                                    }
                                }
                            }
                            var dtobj = _this.util.DateTimeStrToDate(da.date + " " + (i + 1).toString() + ":0:0");
                            data.push({ x: dtobj, y: d });
                        }
                    }
                }
                __WEBPACK_IMPORTED_MODULE_4_chart_js___default.a.Line(_this.chart3.nativeElement.getContext("2d"), {
                    type: 'bar',
                    data: {
                        datasets: [{
                                label: _this.Lang["record_4"],
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
    };
    AboutPage.prototype.debug = function () {
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
        __WEBPACK_IMPORTED_MODULE_4_chart_js___default.a.Line(this.chart0.nativeElement.getContext("2d"), {
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
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('chart0'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AboutPage.prototype, "chart0", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('chart1'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AboutPage.prototype, "chart1", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('chart2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AboutPage.prototype, "chart2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('chart3'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AboutPage.prototype, "chart3", void 0);
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{Lang["history"]}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="flex-row white-block border-bottom text-center">\n    <div class="flex-1 padding-20 h5" [class.tab-active]="currentTab==0" (click)="currentTab=0;loaddata();">{{Lang["record_1"]}}</div>\n    <div class="flex-1 padding-20 h5" [class.tab-active]="currentTab==1" (click)="currentTab=1;loaddata();">{{Lang["record_2"]}}</div>\n    <div class="flex-1 padding-20 h5" [class.tab-active]="currentTab==2" (click)="currentTab=2;loaddata();">{{Lang["record_3"]}}</div>\n    <div class="flex-1 padding-20 h5" [class.tab-active]="currentTab==3" (click)="currentTab=3;loaddata();">{{Lang["record_4"]}}</div>\n  </div>\n  <div [class.hide]=\'currentTab!=0\' class="white-block padding  pagetab">\n    <div class="flex-row flex-center margin-top">\n      <div class="h6 txt-gray">{{Lang["record_1"]}}</div>\n      <div *ngFor="let item of daterange;let l=index;">\n        <span class="h6 ds" [class.dsselect]=\'l==ds0\' (click)="ds0=l;loaddata();">{{item.datetext}}</span>\n      </div>\n    </div>\n    <div class="margin-top">\n      <canvas #chart0 height="200"></canvas>\n    </div>\n    <div class="h4 padding-20 margin-top">\n        {{Lang["datadetail"]}}\n    </div>\n    <div class="padding-20" *ngFor="let item of dt0;let l=index;">\n      <div class="">\n        <div>{{item.date}}</div>\n        <div class="flex-row flex-center margin-top border-bottom " style="padding-bottom:5px;" *ngIf="item.val.length==0">\n          <div class="h5 txt-gray flex-1">{{Lang["nodatanow"]}}</div>\n        </div>\n        <div class="margin-top border-bottom " style="padding-bottom:5px;" *ngFor="let sta of item.val;let j=index;">\n          <div *ngIf="sta!=null&&sta.length>1">\n            <div class="flex-row flex-center margin-top">\n              <div class="h5 txt-gray flex-1">{{Lang["time"]}}</div>\n              <div class="h5 txt-gray flex-1">{{Lang["status"]}}</div>\n              <div class="h5 txt-gray flex-1">{{Lang["peeml"]}}</div>\n            </div>\n\n            <div class="flex-row flex-center margin-top-10" *ngFor="let sub of sta;let k=index;">\n              <div class="h5 txt-gray flex-1">{{sub.record_time_formatting}}</div>\n              <div class="h5 txt-gray flex-1">\n                {{k==0?Lang["startuse"]:""}} \n                {{k==1&&sub.op==\'2\'?Lang["startpee"]:""}} \n                {{k==1&&sub.op==\'3\'?Lang["changepaper"]:""}} \n                {{k>1&&sub.op==\'2\'? Lang["peetips"] : "" }}\n                {{k>1&&sub.op==\'3\'? Lang["changepaper"] : "" }}\n               </div> \n              <div class="h5 txt-gray flex-1" *ngIf="sub.ml>=20">{{sub.ml}}ml</div>\n              <div class="h5 txt-gray flex-1" *ngIf="sub.ml<20"></div>\n            </div>\n\n          </div>\n        </div>\n\n\n      </div>\n    </div>\n  </div>\n  <div [class.hide]=\'currentTab!=1\' class="white-block padding  pagetab">\n    <div class="flex-row flex-center margin-top">\n      <div class="h6 txt-gray">{{Lang["daterange"]}}</div>\n      <div *ngFor="let item of daterange;let l=index;">\n        <span class="h6 ds" [class.dsselect]=\'l==ds1\' (click)="ds1=l;loaddata();">{{item.datetext}}</span>\n      </div>\n    </div>\n    <div class="margin-top">\n      <canvas #chart1 height="200"></canvas>\n    </div>\n    <div class="h4 padding-20 margin-top">\n        {{Lang["datadetail"]}}\n    </div>\n    <div class="padding-40">\n      <div class="flex-row flex-center">\n        <div class="h5 txt-gray flex-1 text-center">{{Lang["fallhappen"]}}</div>\n        <div class="h5 txt-gray flex-1 text-center">{{Lang["fallcount"]}}</div>\n      </div>\n      <div class="flex-row  margin-top-10" *ngFor="let item of dt1;let l=index;">\n        <div class="h5 txt-gray flex-1 text-center">{{item.date}}</div>\n        <div class="h5 txt-gray flex-1 text-center">\n          <div [class.txt-primary]="item.val.length>0" (click)="item.show=(item.show==true?false:true)">{{item.val.length}}</div>\n          <div *ngIf="item.show==true">\n            <div class="txt-gray h6" *ngFor="let sub of item.val;let k=index;">{{sub.record_time_formatting}}</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div [class.hide]=\'currentTab!=2\' class="white-block padding  pagetab">\n    <div class="flex-row flex-center margin-top">\n      <div class="h6 txt-gray">{{Lang["daterange"]}}</div>\n      <div *ngFor="let item of daterange;let l=index;">\n        <span class="h6 ds" [class.dsselect]=\'l==ds2\' (click)="ds2=l;loaddata();">{{item.datetext}}</span>\n      </div>\n    </div>\n    <div class="margin-top">\n      <canvas #chart2 height="200"></canvas>\n    </div>\n    <div class="h4 padding-20 margin-top">\n        {{Lang["datadetail"]}}\n    </div>\n    <div class="padding-40">\n      <div class="flex-row flex-center">\n        <div class="h5 txt-gray flex-1 text-center">{{Lang["date"]}}</div>\n        <div class="h5 txt-gray flex-1 text-center">{{Lang["usetime"]}}</div>\n      </div>\n      <div class="flex-row margin-top-10" *ngFor="let item of dt2;let l=index;">\n        <div class="h5 txt-gray flex-1 text-center">{{item.date}}</div>\n        <div class="h5 txt-gray flex-1 text-center">\n          <div [class.txt-primary]="item.val.length>0" (click)="item.show=(item.show==true?false:true)">{{item.val.length}}</div>\n          <div *ngIf="item.show==true">\n            <div class="txt-gray h6" *ngFor="let sub of item.val;let k=index;">{{sub[sub.length-1].record_time_formatting}}</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div [class.hide]=\'currentTab!=3\' class="white-block padding  pagetab">\n    <div class="flex-row flex-center margin-top">\n      <div class="h6 txt-gray">{{Lang["daterange"]}}</div>\n      <div *ngFor="let item of daterange;let l=index;">\n        <span class="h6 ds" [class.dsselect]=\'l==ds3\' (click)="ds3=l;loaddata();">{{item.datetext}}</span>\n      </div>\n    </div>\n    <div class="margin-top">\n      <canvas #chart3 height="200"></canvas>\n    </div>\n    <div class="h4 padding-20 margin-top">\n        {{Lang["datadetail"]}}\n    </div>\n    <div class="padding-40">\n      <div class="flex-row flex-center">\n        <div class="h5 txt-gray flex-1 text-center">{{Lang["date"]}}</div>\n        <div class="h5 txt-gray flex-1 text-center">{{Lang["peeml"]}}</div>\n      </div>\n      <div class="flex-row margin-top-10" *ngFor="let item of dt3;let l=index;">\n        <div class="h5 txt-gray flex-1 text-center">{{item.date}}</div>\n        <div class="h5 txt-gray flex-1 text-center">\n          <div [class.txt-primary]="item.ml>0" (click)="item.show=(item.show==true?false:true)">{{item.ml}}ml</div>\n          <div *ngIf="item.show==true">\n            <div class="txt-gray h6" *ngFor="let sub of item.val;let k=index;">{{sub[sub.length-1].record_time_formatting}}\n              {{sub[sub.length-1].ml}}ml</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */]])
    ], AboutPage);
    return AboutPage;
}(__WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */]));

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_config__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_util__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_lang__ = __webpack_require__(57);



var AppBase = /** @class */ (function () {
    function AppBase(navCtrl, modalCtrl, viewCtrl, statusBar) {
        this.setting = null;
        this.Lang = [];
        this.statusBar = null;
        this.navCtrl = null;
        this.modalCtrl = null;
        this.viewCtrl = null;
        this.statusBarStyle = "X"; //{DARK}
        this.uploadpath = __WEBPACK_IMPORTED_MODULE_0__api_config__["a" /* ApiConfig */].getUploadPath();
        this.util = __WEBPACK_IMPORTED_MODULE_1__app_util__["a" /* AppUtil */];
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.statusBar = statusBar;
        this.setting = AppBase.Setting;
        this.Lang = __WEBPACK_IMPORTED_MODULE_2__app_lang__["a" /* AppLang */].getLang(AppBase.Setting.lang);
    }
    AppBase.prototype.setStatusBar = function () {
        this.statusBar.styleDefault();
    };
    AppBase.prototype.ionViewDidLoad = function () {
        //this.Lang=AppLang.getLang(AppBase.Setting.lang);
        this.onMyLoad();
    };
    AppBase.prototype.onMyLoad = function () {
    };
    AppBase.prototype.ionViewDidEnter = function () {
        this.reloadSetting();
        this.Lang = __WEBPACK_IMPORTED_MODULE_2__app_lang__["a" /* AppLang */].getLang(AppBase.Setting.lang);
        //alert(JSON.stringify(this.Lang));
        this.setStatusBar();
        this.onMyShow();
    };
    AppBase.prototype.onMyShow = function () {
    };
    AppBase.prototype.onPullRefresh = function (ref) {
        this.onMyShow();
        ref.complete();
    };
    AppBase.prototype.doRefresh = function (ref) {
        var _this = this;
        setTimeout(function () {
            _this.onPullRefresh(ref);
            ref.complete();
        }, 2000);
    };
    AppBase.prototype.changeTab = function (index, param) {
        //var tabsPage=AppBase.tabsPage;
        //tabsPage.tabRef.select(index,param);
        //var tab=AppBase.tabsPage.tabRef.getSelected();
        //console.log(tab);
        AppBase.TabChangeParamCache = { tabIndex: index, param: param };
        this.navCtrl.parent.select(index);
    };
    AppBase.prototype.back = function () {
        this.navCtrl.pop();
    };
    AppBase.prototype.close = function (data) {
        this.viewCtrl.dismiss(data);
    };
    AppBase.prototype.nagivate = function (pagename, param) {
        if (param == undefined || param == null) {
            param = {};
        }
        this.navCtrl.push(pagename, param);
    };
    AppBase.prototype.modal = function (pageobj, param, callback) {
        if (callback === void 0) { callback = null; }
        var modal = this.modalCtrl.create(pageobj, param);
        modal.onDidDismiss(function (data) {
            if (callback != null) {
                callback(data);
            }
        });
        modal.present();
    };
    AppBase.prototype.decode = function (val) {
        return __WEBPACK_IMPORTED_MODULE_1__app_util__["a" /* AppUtil */].HtmlDecode(val);
    };
    AppBase.prototype.contentToLine = function (str) {
        if (str == null) {
            return [""];
        }
        return str.split("\n");
    };
    AppBase.prototype.reloadSetting = function () {
        AppBase.Setting.alert = localStorage.getItem("setting_alert") == null ? AppBase.Setting.alert : localStorage.getItem("setting_alert");
        AppBase.Setting.lang = localStorage.getItem("setting_lang") == null ? AppBase.Setting.lang : localStorage.getItem("setting_lang");
        AppBase.Setting.sound = localStorage.getItem("setting_sound") == null ? AppBase.Setting.sound : localStorage.getItem("setting_sound");
        AppBase.Setting.shushi = localStorage.getItem("setting_shushi") == null ? AppBase.Setting.shushi : localStorage.getItem("setting_shushi");
        AppBase.Setting.mashu = localStorage.getItem("setting_mashu") == null ? AppBase.Setting.mashu : localStorage.getItem("setting_mashu");
        AppBase.Setting.fanshen = localStorage.getItem("setting_fanshen") == null ? AppBase.Setting.fanshen : localStorage.getItem("setting_fanshen");
    };
    AppBase.research = false;
    AppBase.Storage = null;
    AppBase.Setting = { alert: "Y", sound: "Y", shushi: "1", mashu: "1", fanshen: "1", lang: "cn" };
    AppBase.IsIos = false;
    AppBase.IsAndroid = false;
    AppBase.IsMobileWeb = false;
    AppBase.TabChangeParamCache = null;
    return AppBase;
}());

//# sourceMappingURL=app.base.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_util__ = __webpack_require__(169);

var DataMgr = /** @class */ (function () {
    function DataMgr(sqlite) {
        var _this = this;
        this.sqlite = null;
        this.ready = false;
        this.dbmgr = null;
        this.sqlite = sqlite;
        this.sqlite.create({
            name: 'data181011.db',
            location: 'default'
        })
            .then(function (db) {
            db.executeSql('create table if not exists wetrecord(mac VARCHAR(32),record_time datetime,record_date date,op VARCHAR(1),ml int)', [])
                .then(function () {
                console.log('Executed SQL');
                _this.dbmgr = db;
                _this.ready = true;
            })
                .catch(function (e) { return console.log(e); });
        })
            .catch(function (e) { return console.log(e); });
    }
    DataMgr.prototype.addWetRecord = function (mac, op, ml) {
        var _this = this;
        if (op == 2 || op == 3) {
            if (ml < 20) {
                return;
            }
        }
        //alert(mac+"~"+op+"~"+ml);
        if (this.dbmgr == null) {
            return;
        }
        var param = [mac, op, ml];
        var today = new Date();
        var todaystr = __WEBPACK_IMPORTED_MODULE_0__app_app_util__["a" /* AppUtil */].FormatDate(today);
        var nottime = __WEBPACK_IMPORTED_MODULE_0__app_app_util__["a" /* AppUtil */].FormatDateTime(new Date());
        var nottime12 = __WEBPACK_IMPORTED_MODULE_0__app_app_util__["a" /* AppUtil */].FormatDateTime(new Date((new Date()).getTime() - 12 * 3600 * 1000));
        this.dbmgr.executeSql("select * from wetrecord where op='3' and record_date=? and mac='" + mac + "' ", [todaystr]).then(function (ret) {
            var ctime = "";
            if (ret.rows.length == 0 && op != 4 && op != 3) {
                var yesterdaystr = __WEBPACK_IMPORTED_MODULE_0__app_app_util__["a" /* AppUtil */].FormatDate(new Date(today.getTime() - 24 * 3600 * 1000));
                param = [mac, nottime, op, ml, yesterdaystr];
                ctime = yesterdaystr;
                _this.dbmgr
                    .executeSql("select * from wetrecord where mac='" + mac + "' and  op='3' and record_time>'" + nottime12 + "' order by record_time desc ", [])
                    .then(function (ret2) {
                    if (ret2.rows.length == 0) {
                        _this.dbmgr.executeSql("update wetrecord set record_date='" + todaystr + "' where mac='" + mac + "' and record_time>'" + nottime12 + "'");
                    }
                    else {
                        var record_time = ret2.rows.item(0).record_time;
                        _this.dbmgr.executeSql("update wetrecord set record_date='" + todaystr + "' where mac='" + mac + "' and record_time>'" + record_time + "'");
                    }
                });
                ;
            }
            else {
                param = [mac, nottime, op, ml, todaystr];
                ctime = todaystr;
            }
            _this.dbmgr.executeSql("insert into wetrecord (mac,record_time,op,ml,record_date) values (?,?,?,?,?)", param).then(function () { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
            ;
        });
    };
    DataMgr.prototype.getWetRecord = function (mac, from, fromtime, to, totime) {
        if (this.dbmgr == null) {
            return;
        }
        var fromstr = from + " 0:0:0";
        var tostr = to + " 23:59:59";
        var sql = " select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' and '" + from + "'<record_date and record_date<='" + to + "' and op in ('1','2','3') order by record_time ";
        if (from == to) {
            sql = " select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' and '" + from + "'=record_date and op in ('1','2','3') order by  record_time ";
            // totime=fromtime+24 * 3600 * 1000;
        }
        //alert(sql);
        //sql=" select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' order by  record_time ";
        return this.dbmgr.executeSql(sql, []).then(function (data) {
            var ret = [];
            for (var y = 0; y <= (totime - fromtime) / 24 / 3600 / 1000; y++) {
                var date = __WEBPACK_IMPORTED_MODULE_0__app_app_util__["a" /* AppUtil */].FormatDate(new Date(fromtime + y * 24 * 3600 * 1000));
                var cursor = -1;
                var r = { date: date, val: [] };
                var lastclick = null;
                var laststarttime = "";
                var laststarttimef = "";
                var laststarttimed = "";
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
                                ((__WEBPACK_IMPORTED_MODULE_0__app_app_util__["a" /* AppUtil */].DateTimeStrToDate(record_time).getTime()
                                    - __WEBPACK_IMPORTED_MODULE_0__app_app_util__["a" /* AppUtil */].DateTimeStrToDate(lastclick.record_time).getTime()) > 30000)) {
                                cursor++;
                                lastclick = null;
                                laststarttime = record_time;
                                laststarttimef = record_time_formatting;
                                laststarttimed = record_date;
                            }
                        }
                        else {
                            if (cursor > -1) {
                                if (r.val[cursor] == undefined) {
                                    r.val[cursor] = [];
                                    if (laststarttime == "") {
                                        laststarttime = record_time;
                                    }
                                    if (laststarttimef == "") {
                                        laststarttimef = record_time_formatting;
                                    }
                                    if (laststarttimed == "") {
                                        laststarttimed = record_date;
                                    }
                                    r.val[cursor].push({ mac: mac, record_time: laststarttime, record_time_formatting: laststarttimef,
                                        record_date: laststarttimed, op: "1", ml: 0 });
                                }
                                r.val[cursor].push({ mac: mac, record_time: record_time, record_time_formatting: record_time_formatting, record_date: record_date, op: op, ml: ml });
                                lastclick = r.val[cursor][r.val[cursor].length - 1];
                            }
                        }
                    }
                }
                ret.push(r);
            }
            return ret;
        }).catch(function (e) {
            console.log(e);
            return e;
        });
        ;
    };
    DataMgr.prototype.getFallRecord = function (mac, from, fromtime, to, totime) {
        if (this.dbmgr == null) {
            return;
        }
        var fromstr = from + " 0:0:0";
        var tostr = to + " 23:59:59";
        var sql = " select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' and '" + from + "'<record_date and record_date<='" + to + "'  and op in ('4') order by  record_time ";
        if (from == to) {
            sql = " select mac,record_time,record_date,op,ml from wetrecord where mac='" + mac + "' and '" + from + "'=record_date and op in ('4') order by  record_time ";
            //totime=fromtime+24 * 3600 * 1000;
        }
        //alert(sql);
        return this.dbmgr.executeSql(sql, []).then(function (data) {
            var ret = [];
            for (var y = 0; y <= (totime - fromtime) / 24 / 3600 / 1000; y++) {
                var date = __WEBPACK_IMPORTED_MODULE_0__app_app_util__["a" /* AppUtil */].FormatDate(new Date(fromtime + y * 24 * 3600 * 1000));
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
                        r.val.push({ mac: mac, record_time: record_time, record_date: record_date, record_time_formatting: record_time_formatting, op: op, ml: ml });
                    }
                }
                ret.push(r);
            }
            return ret;
        }).catch(function (e) {
            console.log(e);
            return e;
        });
        ;
    };
    return DataMgr;
}());

//# sourceMappingURL=datamgr.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_base__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shengming_shengming__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_lang__ = __webpack_require__(57);
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






var ContactPage = /** @class */ (function (_super) {
    __extends(ContactPage, _super);
    function ContactPage(navCtrl, modalCtrl, statusBar, viewCtrl) {
        var _this = _super.call(this, navCtrl, modalCtrl, viewCtrl, statusBar) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.statusBar = statusBar;
        _this.viewCtrl = viewCtrl;
        return _this;
    }
    ContactPage.prototype.selectAlert = function (e) {
        localStorage.setItem("setting_alert", this.setting.alert);
    };
    ContactPage.prototype.selectSound = function (e) {
        localStorage.setItem("setting_sound", this.setting.sound);
    };
    ContactPage.prototype.selectShushi = function (e) {
        localStorage.setItem("setting_shushi", this.setting.shushi);
    };
    ContactPage.prototype.selectMashu = function (e) {
        //alert(this.setting.mashu);
        localStorage.setItem("setting_mashu", this.setting.mashu);
    };
    ContactPage.prototype.selectFanshen = function (e) {
        //alert(this.setting.fanshen);
        localStorage.setItem("setting_fanshen", this.setting.fanshen);
    };
    ContactPage.prototype.selectLang = function (e) {
        localStorage.setItem("setting_lang", this.setting.lang);
        __WEBPACK_IMPORTED_MODULE_5__app_app_lang__["a" /* AppLang */].getLang(this.setting.lang);
        this.Lang = __WEBPACK_IMPORTED_MODULE_5__app_app_lang__["a" /* AppLang */].Lang;
    };
    ContactPage.prototype.onMyLoad = function () {
    };
    ContactPage.prototype.onMyShow = function () {
    };
    ContactPage.prototype.rescan = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].research = true;
        this.modal("ScanPage", {}, function (selectdevice) {
            if (selectdevice != undefined) {
                _this.changeTab(0, null);
            }
        });
    };
    ContactPage.prototype.gotosehngming = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__shengming_shengming__["a" /* ShengmingPage */]);
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{Lang["setting"]}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-list-header>\n            {{Lang["basesetting"]}}\n        </ion-list-header>\n        <ion-item>\n          <ion-label>{{Lang["language"]}}</ion-label>\n          <ion-select  [(ngModel)]="setting.lang" (ionChange)="selectLang()"  cancelText="{{Lang[\'cancel\']}}" okText="{{Lang[\'ok\']}}">\n            <ion-option value="cn" selected="{{setting.lang==\'cn\'}}">{{Lang.cn}}</ion-option>\n            <ion-option value="en"  selected="{{setting.lang==\'en\'}}" >{{Lang.en}}</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-label>{{Lang["alert"]}}</ion-label>\n          <ion-select  [(ngModel)]="setting.alert" (ionChange)="selectAlert()"  cancelText="{{Lang[\'cancel\']}}" okText="{{Lang[\'ok\']}}">\n            <ion-option value="Y" >{{Lang["on"]}}</ion-option>\n            <ion-option value="N"  >{{Lang["off"]}}</ion-option>\n          </ion-select>\n        </ion-item>\n        <!--\n        <ion-item>\n          <ion-label>声音</ion-label>\n          <ion-select  [(ngModel)]="setting.sound"  (ionChange)="selectSound()" cancelText="取消" okText="确认">\n            <ion-option value="Y" >开</ion-option>\n            <ion-option value="N"  >关</ion-option>\n          </ion-select>\n        </ion-item>-->\n        <ion-item>\n          <ion-label>{{Lang["accurrency"]}}</ion-label>\n          <ion-select [(ngModel)]="setting.shushi"  (ionChange)="selectShushi()" cancelText="{{Lang[\'cancel\']}}" okText="{{Lang[\'ok\']}}">\n            <ion-option value="0">{{Lang["shushi_0"]}}</ion-option>\n            <ion-option value="1">{{Lang["shushi_1"]}}</ion-option>\n            <ion-option value="2">{{Lang["shushi_2"]}}</ion-option>\n            <ion-option value="3">{{Lang["shushi_3"]}}</ion-option>\n            <ion-option value="4">{{Lang["shushi_4"]}}</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-label>{{Lang["size"]}}</ion-label>\n          <ion-select [(ngModel)]="setting.mashu" s (ionChange)="selectMashu()"  cancelText="{{Lang[\'cancel\']}}" okText="{{Lang[\'ok\']}}">\n            <ion-option value="1">XL</ion-option>\n            <ion-option value="2">L</ion-option>\n            <ion-option value="3">M</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-label>{{Lang["fanshentips"]}}</ion-label>\n          <ion-select [(ngModel)]="setting.fanshen"  (ionChange)="selectFanshen()"   cancelText="{{Lang[\'cancel\']}}" okText="{{Lang[\'ok\']}}">\n            <ion-option value="1">1{{Lang["hour"]}}</ion-option>\n            <ion-option value="2">2{{Lang["hour"]}}</ion-option>\n            <ion-option value="3">3{{Lang["hour"]}}</ion-option>\n            <ion-option value="4">{{Lang["noalert"]}}</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item (click)="gotosehngming()">\n            <ion-label>{{Lang["usestatement"]}}</ion-label>\n            <ion-icon name="arrow-forward" item-end></ion-icon>\n        </ion-item>\n      </ion-list>\n      \n      <button ion-button (click)="rescan(1)" class="bottombutton">\n          {{Lang["rescan"]}}\n        </button>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], ContactPage);
    return ContactPage;
}(__WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */]));

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShengmingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_base__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(32);
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
 * Generated class for the ShengmingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ShengmingPage = /** @class */ (function (_super) {
    __extends(ShengmingPage, _super);
    function ShengmingPage(navCtrl, modalCtrl, statusBar, viewCtrl) {
        var _this = _super.call(this, navCtrl, modalCtrl, viewCtrl, statusBar) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.statusBar = statusBar;
        _this.viewCtrl = viewCtrl;
        return _this;
    }
    ShengmingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shengming',template:/*ion-inline-start:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/shengming/shengming.html"*/'<!--\n  Generated template for the ShengmingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{Lang["usestatement"]}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p>\n      {{Lang["state_1"]}}\n  </p>\n  <p>\n      {{Lang["state_2"]}}\n  </p>\n  <p>\n      {{Lang["state_3"]}}\n  </p>\n</ion-content>\n'/*ion-inline-end:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/shengming/shengming.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], ShengmingPage);
    return ShengmingPage;
}(__WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */]));

//# sourceMappingURL=shengming.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_base__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_ble__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__aidevice__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_record_api__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__datamgr__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_audio__ = __webpack_require__(116);
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












var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage(navCtrl, modalCtrl, statusBar, viewCtrl, localNotifications, alertCtrl, backgroundMode, ble, db, nativeAudio) {
        var _this = _super.call(this, navCtrl, modalCtrl, viewCtrl, statusBar) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.statusBar = statusBar;
        _this.viewCtrl = viewCtrl;
        _this.localNotifications = localNotifications;
        _this.alertCtrl = alertCtrl;
        _this.backgroundMode = backgroundMode;
        _this.ble = ble;
        _this.db = db;
        _this.nativeAudio = nativeAudio;
        _this.selectdeviceid = "";
        _this.mockdevice = {
            name: "4C:4E:54:00:00:47", id: "4C:4E:54:00:00:47", address: "4C:4E:54:00:00:47",
            advertising: "2,1,6,17,-1,76,78,84,0,0,71,56,-11,-111,1,21,2,84,45,4,-1,9,9,32,76,78,45,50,48,48,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
        };
        _this.aidevice = new __WEBPACK_IMPORTED_MODULE_7__aidevice__["a" /* AIDevice */]();
        _this.count = 0;
        _this.aidevice.db = new __WEBPACK_IMPORTED_MODULE_9__datamgr__["a" /* DataMgr */](db);
        return _this;
    }
    HomePage.prototype.onMyLoad = function () {
        this.nativeAudio.preloadSimple('fall', 'assets/ring/fall.mp3');
        this.nativeAudio.preloadSimple('wet', 'assets/ring/wet.mp3');
        this.nativeAudio.preloadSimple('fanshen', 'assets/ring/fanshen.mp3');
        this.nativeAudio.preloadSimple('fanshen2', 'assets/ring/fanshen2.mp3');
    };
    HomePage.prototype.onMyShow = function () {
        var _this = this;
        //alert(this.Lang["generalindex"]);
        var that = this;
        this.aidevice.startTime();
        this.aidevice.setNotification(this.localNotifications);
        this.aidevice.setNativeAudio(this.nativeAudio);
        if (this.selectdeviceid == "") {
            this.modal("ScanPage", {}, function (selectdevice) {
                //alert(selectdevice);
                _this.selectdeviceid = selectdevice.id;
                _this.tryScan();
            });
        }
        else {
            this.tryScan();
        }
        try {
            __WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].Storage.get("selectdeviceid").then(function (id) {
                _this.selectdeviceid = id;
            });
        }
        catch (ex) {
        }
        // AppBase.Storage.get("selectdeviceid").then((selectdeviceid)=>{
        //   this.selectdeviceid=selectdeviceid;
        // });
        //this.modal("ScanPage",{},(selectdevice)=>{
        //alert(1);
        //this.selectdeviceid=selectdevice.id;
        //
        //});
        this.backgroundMode.enable();
        // setTimeout(()=>{
        //   this.localNotifications.schedule({
        //     text:"aa"
        //   });
        // },5000);
    };
    HomePage.prototype.tryScan = function () {
        var _this = this;
        //alert(this.device.advertising);
        if (__WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */].IsMobileWeb) {
            this.aidevice.reloaddata(this.mockdevice.id, this.mockdevice.advertising);
            //alert(this.aidevice.Version);
        }
        else {
            try {
                this.ble.stopScan();
            }
            catch (e) {
            }
            this.ble.startScanWithOptions([], { reportDuplicates: true }).subscribe(function (device) {
                //if(this.selectdeviceid!=)
                if (device.name != undefined && device.name == " LN-200c" && _this.selectdeviceid == device.id) {
                    //device.data = JSON.stringify(device);
                    //this.ble.stopScan();
                    //this.close(device);
                    //alert(JSON.stringify(device.data));
                    //this.tryConnect();
                    if (device.advertising != undefined) {
                        //alert(this.device.advertising);
                        _this.count++;
                        _this.aidevice.reloaddata(device.id, device.advertising);
                        //alert(this.aidevice.Version);
                    }
                    //2.73.0
                }
            }, function (error) {
                alert(error);
            }, function () {
            });
        }
    };
    HomePage.prototype.handelFall = function () {
        var _this = this;
        //salert(1);
        var confirm = this.alertCtrl.create({
            title: '摔倒处理',
            message: '已经处理完毕？',
            buttons: [
                {
                    text: '否',
                    handler: function () {
                    }
                },
                {
                    text: '是',
                    handler: function () {
                        _this.aidevice.fall = "N";
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage.prototype.stringToBytes = function (string) {
        var array = new Uint8Array(string.length);
        for (var i = 0, l = string.length; i < l; i++) {
            array[i] = string.charCodeAt(i);
        }
        return array.buffer;
    };
    // ASCII only
    HomePage.prototype.bytesToString = function (buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    };
    HomePage.prototype.cal = function (msg) {
        alert(msg);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/home/home.html"*/'<ion-header>\n  <div class="padding-20 topbar flex-row flex-center">\n    <div>\n      <img src="assets/imgs/icon.png" class="logoicon" />\n    </div>\n    <div class="margin-left-10 txt-white txt-bold" >\n      NO:{{aidevice.no}}\n    </div>\n    <div class="flex-1 text-right txt-white" >\n      {{Lang["battery"]}}：\n    </div>\n    <div class="txt-white text-right txt-bold line-height-0">\n      <!--感应器的电量显示需要校准，无电量时变成红色闪烁。\n        三格满电(>=2.9V)\n        2 格电(>=2.8V) \n        1 格电(>=2.7V)\n        0 格电(<2.7V) \n        红色闪烁-->\n      <div *ngIf="aidevice.v0>=2.9" class="battery b3" ></div>\n      <div *ngIf="2.8<=aidevice.v0&&aidevice.v0<2.9" class="battery b2"></div>\n      <div *ngIf="2.7<=aidevice.v0&&aidevice.v0<2.8" class="battery b1"></div>\n      <div *ngIf="aidevice.v0<2.7" class="battery bs"></div>\n    </div>\n  </div>\n</ion-header>\n<ion-content>\n  <div class="margin-top-3 padding-10">\n    <div class="border-radius-5" [style.background-color]=\'aidevice.currentstatus.color\'>\n      <div class="padding-10 ">\n        <div class="flex-row flex-center">\n          <div class="flex-1">\n            <div class="txt-bold h5" style="color:#f1f1f1">{{Lang["usetime"]}}：{{aidevice.usetime}}</div>\n          </div>\n          <div class="flex-1 text-right" *ngIf="aidevice.Version!=0" ><!--(click)="aidevice.debugFall()"-->\n            <div class="txt-bold h5" style="color:#f1f1f1">{{Lang["temperature"]}}：{{aidevice.temperature}}℃</div>\n          </div>\n        </div>\n        <div class="margin-top text-center">\n          <div class="h5">{{Lang["generalindex"]}}：{{((100-aidevice.shushidu)<0)?0:(100-aidevice.shushidu)}}</div>\n          <!--<div>{{aidevice.greenYV}}->{{aidevice.yellowV}}->{{aidevice.orangeV}}->{{aidevice.redV}}</div>-->\n          <div class=" txt-bold" style="font-size: 52px" >{{Lang[aidevice.currentstatus.name]}}</div>\n        </div>\n        <div class="margin-top padding-10">\n          <div class="msgbg h5 padding-5 border-radius-5 txt-white text-center">{{Lang[aidevice.currentstatus.msg]}}</div>\n        </div>\n      </div>\n      <div class="flex-row">\n        <div *ngFor="let item of aidevice.statuslist;let l=index;" class="flex-1 c{{l}}" [style.background-color]=\'item.color\' style="height:20px"></div>\n      </div>\n    </div>\n  </div>\n  <!--\n  <div class="h6">\n    调试id：{{lastdeviceid}}\n  </div>\n  <div class="h6">\n    调试：{{aidevice.advertising}}\n  </div>-->\n  <div class="margin-top-10 padding-10" style="padding-top: 0px;">\n    <div class="border-radius-5 border flex-row flex-center white-block">\n      <div class="padding-20 h4 lkfont-{{setting.lang}} text-center" [innerHtml]=\'Lang["forecastniaoliang"]\'></div>\n      <div>\n        <img class="shuxian" />\n      </div>\n      <div class="flex-1 h3 text-center">{{aidevice.wetml}}</div>\n      <div class="flex-1 h4 text-center">\n        <!--{{setting.mashu==\'1\'?"成人大码":""}}\n          {{setting.mashu==\'2\'?"成人中码":""}}\n          {{setting.mashu==\'3\'?"成人均码":""}}-->\n        <div>\n          <img src="assets/res/wet{{aidevice.currentstatus.wet}}.png" class="wetpaper" />\n        </div>\n        <div class="h6">{{Lang["xishouliang"]}}{{setting.mashu==\'1\'?"700ml":""}} {{setting.mashu==\'2\'?"600ml":""}} {{setting.mashu==\'3\'?"550ml":""}}\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ></div>\n  <div class="margin-top-10 padding-10" style="padding-top: 0px;" >\n    <div class="border-radius-5 border flex-row flex-center white-block " [class.falling]="aidevice.fall==\'Y\'">\n      <div class="padding-20 h4 lkfont-{{setting.lang}} text-center" [innerHtml]=\'Lang["urgent"]\'></div>\n      <div>\n        <img class="shuxian" />\n      </div>\n      <div class="flex-1 h3  text-center" *ngIf="aidevice.fall==\'Y\'" (click)="handelFall()" >{{Lang["fallcare"]}}</div>\n      <div class="flex-1 h3  text-center" *ngIf="aidevice.fall!=\'Y\'" >{{Lang["nodata"]}}</div>\n      <div class="flex-1 h4 text-center" >\n        <img src="assets/res/fall.png" class="fallpic" *ngIf="aidevice.fall==\'Y\'" (click)="handelFall()" />\n      </div>\n    </div>\n  </div>\n  <div class="margin-top-10 padding-10" style="padding-top: 0px;">\n    <div class="border-radius-5 border flex-row flex-center white-block">\n      <div class="padding-20 h4 lkfont-{{setting.lang}} text-center" [innerHtml]=\'Lang["sleepmonitor"]\'></div>\n      <div>\n        <img class="shuxian" />\n      </div>\n      <div class="flex-1 h3 text-center">\n        <div>{{aidevice.post}}</div>\n        <div class="h6" *ngIf="aidevice.postimg!=\'\'" >{{Lang[aidevice.postimg]}}{{Lang["posttime"]}}：{{aidevice.nomovetime}}</div>\n      </div>\n      <div class="flex-1 h4 text-center">\n        <img src="assets/res/{{aidevice.postimg}}.png" *ngIf="aidevice.postimg!=\'\'" class="shuipost" />\n      </div>\n    </div>\n  </div>\n  <div class="margin-top-3 padding-10" style="padding-top: 0px;" *ngIf="false">\n    <div class="border-radius-5 border flex-row flex-center white-block">\n      <div class="padding-20 h4 lkfont-{{setting.lang}} text-center" [innerHtml]=\'Lang["usersetting"]\'></div>\n      <div>\n        <img class="shuxian" />\n      </div>\n      <div class="flex-1 text-center">\n        <div class="h6">{{Lang["sound"]}}</div>\n        <div class="h3">{{setting.sound==\'Y\'?Lang["on"]:Lang["off"]}}</div>\n      </div>\n      <div class="flex-1 text-center">\n        <div class="h6">{{Lang["accurrency"]}}</div>\n        <div class="h3">{{setting.shushi==\'0\'?Lang["shushi_0"]:""}}\n            {{setting.shushi==\'1\'?Lang["shushi_1"]:""}}\n            {{setting.shushi==\'2\'?Lang["shushi_2"]:""}}\n            {{setting.shushi==\'3\'?Lang["shushi_3"]:""}}\n            {{setting.shushi==\'4\'?Lang["shushi_4"]:""}}\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="text-center h6 padding margin-top-10 txt-gray">v1.0.1 互爱管家</div>\n</ion-content>'/*ion-inline-end:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/home/home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_8__providers_record_api__["a" /* RecordApi */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], HomePage);
    return HomePage;
}(__WEBPACK_IMPORTED_MODULE_2__app_app_base__["a" /* AppBase */]));

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api_config__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var RecordApi = /** @class */ (function () {
    function RecordApi(http) {
        this.http = http;
    }
    //获取所有的广告
    RecordApi.prototype.update = function (data, showLoadingModal) {
        if (showLoadingModal === void 0) { showLoadingModal = true; }
        var url = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].getApiUrl() + 'record/update';
        var headers = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].GetHeader(url, data);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].ParamUrlencoded(data);
        var loading = null;
        if (showLoadingModal) {
            loading = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].GetLoadingModal();
        }
        return this.http.post(url, body, options).toPromise()
            .then(function (res) {
            if (__WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DataLoadedHandle('record/update', data, res)) {
                if (showLoadingModal) {
                    __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DimissLoadingModal();
                }
                var retjson = res.json();
                console.log(retjson);
                return retjson;
            }
            else {
                console.log(res);
                return Promise.reject(res);
            }
        })
            .catch(function (err) {
            console.log(err);
            if (showLoadingModal) {
                __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DimissLoadingModal();
            }
            return __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].ErrorHandle('record/update', data, err);
        });
    };
    RecordApi.prototype.wetting = function (data, showLoadingModal) {
        if (showLoadingModal === void 0) { showLoadingModal = true; }
        var url = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].getApiUrl() + 'record/wetting';
        var headers = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].GetHeader(url, data);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].ParamUrlencoded(data);
        var loading = null;
        if (showLoadingModal) {
            loading = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].GetLoadingModal();
        }
        return this.http.post(url, body, options).toPromise()
            .then(function (res) {
            if (__WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DataLoadedHandle('record/wetting', data, res)) {
                if (showLoadingModal) {
                    __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DimissLoadingModal();
                }
                var retjson = res.json();
                console.log(retjson);
                return retjson;
            }
            else {
                console.log(res);
                return Promise.reject(res);
            }
        })
            .catch(function (err) {
            console.log(err);
            if (showLoadingModal) {
                __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DimissLoadingModal();
            }
            return __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].ErrorHandle('record/wetting', data, err);
        });
    };
    RecordApi.prototype.falling = function (data, showLoadingModal) {
        if (showLoadingModal === void 0) { showLoadingModal = true; }
        var url = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].getApiUrl() + 'record/falling';
        var headers = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].GetHeader(url, data);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].ParamUrlencoded(data);
        var loading = null;
        if (showLoadingModal) {
            loading = __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].GetLoadingModal();
        }
        return this.http.post(url, body, options).toPromise()
            .then(function (res) {
            if (__WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DataLoadedHandle('record/falling', data, res)) {
                if (showLoadingModal) {
                    __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DimissLoadingModal();
                }
                var retjson = res.json();
                console.log(retjson);
                return retjson;
            }
            else {
                console.log(res);
                return Promise.reject(res);
            }
        })
            .catch(function (err) {
            console.log(err);
            if (showLoadingModal) {
                __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].DimissLoadingModal();
            }
            return __WEBPACK_IMPORTED_MODULE_2__app_api_config__["a" /* ApiConfig */].ErrorHandle('record/falling', data, err);
        });
    };
    RecordApi = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], RecordApi);
    return RecordApi;
}());

//# sourceMappingURL=record.api.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MallPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
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
 * Generated class for the MallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MallPage = /** @class */ (function () {
    function MallPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MallPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MallPage');
    };
    MallPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mall',template:/*ion-inline-start:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/mall/mall.html"*/'<!--\n  Generated template for the MallPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content>\n<iframe src="https://shop.m.taobao.com/shop/shop_index.htm?user_id=3437900183&item_id=572668909464&spm=a2141.7c.action.shop" width="100%" height="100%" >\n\n</iframe>\n</ion-content>\n'/*ion-inline-end:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/pages/mall/mall.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], MallPage);
    return MallPage;
}());

//# sourceMappingURL=mall.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AIDevice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_base__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_lang__ = __webpack_require__(57);


var AIDevice = /** @class */ (function () {
    function AIDevice() {
        this.deviceid = "";
        this.db = null;
        this.advertising = "";
        this.isclick = false;
        this.lasttimespan = 0;
        this.usetime = "--";
        this.lastupdatetime = 0;
        this.Version = 0;
        this.scanRecord = [];
        this.mData = [];
        this.angleData = Array(3);
        this.VstepV = 0;
        this.greenYV = 4; //黄绿色触发值 相当于520
        this.redV = 30; //红色触发值 相当于400
        this.yellowV = 11; //黄色触发值
        this.orangeV = 22; //橙色触发值
        this.no = "";
        this.wetml = "0ml";
        this.ml = 0;
        this.wetval = "--";
        this.cval = "--";
        this.statuslist = [];
        this.disconnectstatus = { color: "#fcfcfc", name: "unconnec", idx: "", msg: "nodeviceconnect" };
        this.unclickstatus = { color: "#fcfcfc", name: "connec", idx: "", msg: "clickopenandchange" };
        this.currentstatus = { color: "#fcfcfc", name: "unconnec", idx: "" };
        this.temperature = "--";
        this.v0 = 0.0;
        this.battery = __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["unconnec"];
        this.post = "";
        this.postimg = "";
        this.nomovetime = "--";
        this.fall = "N";
        this.fan = "N";
        this.statusCheck = null;
        this.level = 0;
        this.displayC = 530;
        this.shushidu = 0;
        this.sendunconnect = false;
        this.fall30 = false; //30秒以内的跌倒数据不再重复计入
        this.localNotifications = null;
        this.nativeAudio = null;
        this.notifylist = [];
        this.t = 0;
        this.statuslist.push({ color: "rgb(66,187,55)", name: "status_0", msg: "msg_0", v: 100, wet: 0 });
        this.statuslist.push({ color: "rgb(107,251,13)", name: "status_1", msg: "msg_1", v: 75, wet: 1 });
        this.statuslist.push({ color: "rgb(255,255,11)", name: "status_2", msg: "msg_2", v: 50, wet: 2 });
        this.statuslist.push({ color: "rgb(253,166,10)", name: "status_3", msg: "msg_3", v: 25, wet: 3 });
        this.statuslist.push({ color: "rgb(250,0,63)", name: "status_4", msg: "msg_4", v: 0, wet: 4 });
        this.currentstatus = this.disconnectstatus;
        this.lastupdatetime = (new Date).getTime() / 1000;
    }
    AIDevice.prototype.startTime = function () {
        var _this = this;
        var that = this;
        this.statusCheck = setInterval(function () {
            _this.timerFunc();
        }, 1000);
    };
    AIDevice.prototype.timerFunc = function () {
        var nowtime = (new Date()).getTime() / 1000;
        if (nowtime - this.lastupdatetime > 10 * 60) {
            this.cleardata();
            if (this.sendunconnect == false) {
                this.sendunconnect = true;
                this.notify(4, __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["havebeenunconnect"]);
            }
        }
        if (this.lasttimespan > 0) {
            var ts = parseInt((nowtime - this.lasttimespan).toFixed());
            if (ts < 60) {
                this.usetime = ts + __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["s"];
            }
            else if (60 <= ts && ts < 3600) {
                this.usetime = (ts / 60).toFixed() + __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["m"];
            }
            else {
                this.usetime = (ts / 3600).toFixed() + __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["h"];
                var lstminute = parseInt(((ts % 3600) / 60).toFixed());
                if (lstminute > 0) {
                    this.usetime += lstminute + __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["m"];
                }
            }
        }
    };
    AIDevice.prototype.reloaddata = function (deviceid, datastr) {
        this.deviceid = deviceid;
        try {
            var devcut = this.deviceid.split(":");
            this.no = devcut[devcut.length - 1];
        }
        catch (e) {
            this.no = "";
        }
        this.lastupdatetime = (new Date).getTime() / 1000;
        this.advertising = datastr;
        this.scanRecord = datastr.split(",");
        this.Version = AIDevice.GetVersion(this.scanRecord);
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
            this.cleardata();
            this.currentstatus = this.unclickstatus;
        }
        else {
            this.getWetness();
            if (this.isclick == false) {
                this.isclick = true;
                this.lasttimespan = (new Date()).getTime() / 1000;
                // this.recordapi.update({ mac: this.deviceid, op: "C", ml: this.ml, level: this.level, data: this.advertising }).then((ret) => {
                //    console.log(ret);
                //});
                //alert("?kazu");
                this.db.addWetRecord(this.deviceid, 1, this.ml);
            }
            this.sendunconnect = false;
            this.getSensetive();
            this.getTemperature();
            this.getBattery();
            this.getPost();
            this.checkFall();
        }
    };
    AIDevice.prototype.getBattery = function () {
        var mData = this.mData;
        var v0 = 0.0;
        if (this.Version == 2) {
            v0 = ((200 + (mData[3] & 0xFF))); //
        }
        else {
            v0 = (((mData[2] & 0xFF) << 8) + (mData[1] & 0xFF)) / 1024 * 360;
        }
        this.v0 = v0 / 100.0;
        if (this.v0 <= 0) {
            this.battery = "已断开";
        }
        else if (this.v0 < 2) {
            this.battery = "低电量";
        }
        else {
            this.battery = "正常";
        }
    };
    AIDevice.prototype.getTemperature = function () {
        var tempratureValue = 0.0;
        if (this.Version == 1) {
            tempratureValue = parseFloat(this.mData[7]);
            this.temperature = (23.0 + (tempratureValue / 2)).toFixed(1);
        }
        else if (this.Version == 2) {
            tempratureValue = this.mData[4] & 0xFF;
            this.temperature = (tempratureValue / 2).toFixed(1);
        }
    };
    AIDevice.GetwholeDatelength = function (Version) {
        if (Version == 0)
            return 25;
        if (Version == 1)
            return 27;
        else
            return 31;
    };
    AIDevice.GetDataPosition = function (Version) {
        if (Version == 0)
            return 18;
        if (Version == 1)
            return 9;
        if (Version == 2)
            return 14;
        else
            return 9;
    };
    AIDevice.GetVersion = function (scanRecord) {
        if (scanRecord.length < 25 || scanRecord[0] != 0x02 || scanRecord[1] != 0x01 ||
            scanRecord[2] != 0x06 || scanRecord[3] != 0x03 || scanRecord[4] != 0x03 ||
            scanRecord[5] != 0x58 || scanRecord[6] != 0x69 || String.fromCharCode(scanRecord[9]) != 'L' ||
            String.fromCharCode(scanRecord[10]) != 'N' || String.fromCharCode(scanRecord[11]) != '-'
            || String.fromCharCode(scanRecord[12]) != '2' ||
            String.fromCharCode(scanRecord[13]) != '0' || String.fromCharCode(scanRecord[14]) != '0'
            || String.fromCharCode(scanRecord[15]) != 'N' ||
            scanRecord[18] == 0x00) {
            if (scanRecord.length < 27 || scanRecord[0] != 0x02 || scanRecord[1] != 0x01 ||
                scanRecord[2] != 0x06 ||
                String.fromCharCode(scanRecord[5]) != 'S' || String.fromCharCode(scanRecord[6]) != 'A'
                || String.fromCharCode(scanRecord[7]) != 'N' || String.fromCharCode(scanRecord[8]) != ' ' || scanRecord[9] != 0x01) {
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
                                String.fromCharCode(scanRecord[30]) != 'c'))) {
                    return 2;
                }
                else {
                    //String s=String.valueOf(scanRecord[5] + scanRecord[6]+scanRecord[7]+scanRecord[28] + scanRecord[29]+scanRecord[30]);
                    //mScanBt.setText(s);
                    return 2; //version C
                }
            }
            else {
                return 1;
            }
        }
        else {
            return 0;
        }
    };
    AIDevice.prototype.getSensetive = function () {
        var sensitivityV = __WEBPACK_IMPORTED_MODULE_0__app_app_base__["a" /* AppBase */].Setting.shushi;
        if (sensitivityV == "4") {
            this.greenYV = 4; //黄绿色触发值 相当于520
            this.redV = 30; //红色触发值 相当于400
            this.yellowV = 11; //黄色触发值
            this.orangeV = 22; //橙色触发值
        }
        else if (sensitivityV == "3") {
            this.greenYV = 11; //黄绿色触发值 相当于480
            this.redV = 60; //红色触发值 相当于267
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV; //黄色触发值
            this.orangeV = this.yellowV + this.VstepV; //橙色触发值
        }
        else if (sensitivityV == "2") {
            this.greenYV = 20; //黄绿色触发值 相当于480
            this.redV = 90; //红色触发值 相当于200
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV; //黄色触发值
            this.orangeV = this.yellowV + this.VstepV; //橙色触发值
        }
        else if (sensitivityV == "1") {
            this.greenYV = 20; //黄绿色触发值 相当于480
            this.redV = 120; //红色触发值 相当于160
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV; //黄色触发值
            this.orangeV = this.yellowV + this.VstepV; //橙色触发值
        }
        else if (sensitivityV == "0") {
            this.greenYV = 20; //黄绿色触发值 相当于480
            this.redV = 150; //红色触发值 相当于133
            this.VstepV = (this.redV - this.greenYV) / 3;
            this.yellowV = this.greenYV + this.VstepV; //黄色触发值
            this.orangeV = this.yellowV + this.VstepV; //橙色触发值
        }
    };
    AIDevice.prototype.getWetness = function () {
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
        if (this.displayC > c) {
            this.displayC = (this.displayC * (mytempfact - 1) + c) / mytempfact; //缓慢变小
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
            if (DataValue < 0)
                DataValue = 0;
            this.setWetStatus(DataValue);
        }
        var tempcc = 0;
        var CCfactor = __WEBPACK_IMPORTED_MODULE_0__app_app_base__["a" /* AppBase */].Setting.mashu;
        //520	381	266	230	197	172	156	144	131	130	126	122	100
        //10	50	100	150	200	250	300	350	400	450	500	600	800
        //520	383	268	232	199	174	158	146	133	132	128	124	100
        //10	50	100	150	200	250	300	350	400	450	500	600	800
        if (CCfactor == "3") {
            var a = [10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 800]; //amount table
            var v = [520, 383, 268, 232, 199, 174, 158, 146, 133, 132, 128, 124, 100]; //value table
            this.setWetml(a, v, c);
        }
        else if (CCfactor == "2") {
            var a = [10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 800]; //amount table Baishi
            var v = [520, 381, 266, 230, 197, 172, 156, 144, 131, 130, 126, 122, 100]; //value table
            this.setWetml(a, v, c);
        }
        else {
            var a = [10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 800]; //amount table Baishi
            var v = [520, 381, 266, 230, 197, 172, 156, 144, 131, 130, 126, 122, 100]; //value table
            this.setWetml(a, v, c);
        }
        //alert(c);
        //alert(DataValue);
        this.cval = parseInt(DataValue).toFixed();
        this.wetval = parseInt(c).toFixed();
        this.shushidu = parseInt((DataValue * 100 / this.redV).toString());
    };
    AIDevice.prototype.setWetStatus = function (DataValue) {
        var level = 0;
        if (DataValue <= this.greenYV) {
            this.currentstatus = this.statuslist[0];
            level = 0;
            //this.notify(11,this.statuslist[1].msg);
        }
        else if (this.greenYV < DataValue && DataValue <= this.yellowV) {
            this.currentstatus = this.statuslist[1];
            level = 1;
            //this.notify(12,this.statuslist[2].msg);
        }
        else if (this.yellowV < DataValue && DataValue <= this.orangeV) {
            this.currentstatus = this.statuslist[2];
            level = 2;
            //this.notify(13,this.statuslist[3].msg);
        }
        else if (this.orangeV < DataValue && DataValue <= this.redV) {
            this.currentstatus = this.statuslist[3];
            level = 3;
            //this.notify(14,this.statuslist[4].msg);
        }
        else if (this.redV < DataValue) {
            level = 4;
            this.currentstatus = this.statuslist[4];
            this.notify(15, __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang[this.statuslist[4].msg]);
        }
        if (level > this.level) {
            if (level == 1) {
                this.db.addWetRecord(this.deviceid, 2, this.ml);
                this.notify(12, __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang[this.statuslist[1].msg]);
            }
            if (level == 4) {
                this.db.addWetRecord(this.deviceid, 2, this.ml);
                this.notify(14, __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang[this.statuslist[4].msg]);
            }
            this.level = level;
        }
        //this.recordapi.update({ mac: this.deviceid, op: "N", ml: this.ml, level: this.level, data: this.advertising }).then((ret) => {
        //    console.log(ret);
        //});
    };
    AIDevice.prototype.setWetml = function (a, v, c) {
        var K = Array(a.length - 1); //slope
        for (var i = 0; i < K.length; i++) {
            K[i] = 1000 * (a[i + 1] - a[i]) / (v[i] - v[i + 1]); //K is a scaled 1000 times slope
        }
        if (c > v[0]) {
            this.wetml = "0ml";
            this.ml = 0;
        }
        else if (c < v[v.length - 1]) {
            this.wetml = ">" + a[a.length - 1].toFixed() + "ml";
            this.ml = a[a.length - 1];
        }
        else {
            for (var i = 0; i < K.length; i++) {
                if (c < v[i] && c > v[i + 1]) {
                    var tempV = a[i] + K[i] * (v[i] - c) / 1000;
                    this.wetml = tempV.toFixed().toString() + "ml";
                    this.ml = tempV;
                    break;
                }
            }
        }
    };
    AIDevice.prototype.getPost = function () {
        var posture = this.mData[5];
        if ((posture & 0x1) == 1) {
            this.post = __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["selectdown"];
            if (this.postimg != "卧") {
                this.fan == "N";
            }
            this.postimg = "卧";
        }
        else if ((posture >> 1 & 0x1) == 1) {
            this.post = __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["selectleft"];
            if (this.postimg != "左") {
                this.fan == "N";
            }
            this.postimg = "左";
        }
        else if ((posture >> 2 & 0x1) == 1) {
            this.post = __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["selectup"];
            if (this.postimg != "仰") {
                this.fan == "N";
            }
            this.postimg = "仰";
        }
        else if ((posture >> 3 & 0x1) == 1) {
            this.post = __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["selectright"];
            if (this.postimg != "右") {
                this.fan == "N";
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
            this.nomovetime = ts + __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["s"];
        }
        else if (60 <= ts && ts < 3600) {
            this.nomovetime = (ts / 60).toFixed() + __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["m"];
        }
        else {
            this.nomovetime = (ts / 3600).toFixed() + __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["h"];
        }
        var fanshentips = __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["timetochange"];
        var hoursecond = 3600;
        if (__WEBPACK_IMPORTED_MODULE_0__app_app_base__["a" /* AppBase */].Setting.fanshen == "1") {
            if (ts > 1 * hoursecond) {
                this.fan == "Y";
                this.notify(5, fanshentips);
            }
        }
        if (__WEBPACK_IMPORTED_MODULE_0__app_app_base__["a" /* AppBase */].Setting.fanshen == "2") {
            if (ts > 2 * hoursecond) {
                this.fan == "Y";
                this.notify(5, fanshentips);
            }
        }
        if (__WEBPACK_IMPORTED_MODULE_0__app_app_base__["a" /* AppBase */].Setting.fanshen == "3") {
            if (ts > 3 * hoursecond) {
                this.fan == "Y";
                this.notify(5, fanshentips);
            }
        }
    };
    AIDevice.prototype.checkFall = function () {
        var that = this;
        var posture = this.mData[5];
        if ((posture >> 7 & 0x1) == 1) {
            //alert("dielea"+this.fall+"~"+(this.fall30?"30":"100"));
            if (this.fall != 'Y' && this.fall30 == false) {
                this.fall30 = true;
                this.fall = "Y";
                this.notify(3, __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["falltohelp"]);
                this.db.addWetRecord(this.deviceid, 4, this.ml);
                setTimeout(function () {
                    that.fall30 = false;
                }, 30000);
            }
        }
        else {
            //this.fall = "N";
        }
    };
    AIDevice.prototype.debugFall = function () {
        this.db.addWetRecord(this.deviceid, 4, this.ml);
        this.fall = "Y";
        this.notify(3, __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["falltohelp"]);
    };
    AIDevice.prototype.cleardata = function () {
        this.currentstatus = this.disconnectstatus;
        this.temperature = "--";
        this.wetml = "--ml";
        this.cval = "--";
        this.wetval = "--";
        this.battery = __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["unconnected"];
        this.fall = "N";
        this.post = __WEBPACK_IMPORTED_MODULE_1__app_app_lang__["a" /* AppLang */].Lang["no"];
        this.postimg = "";
        this.nomovetime = "--";
        this.usetime = "--";
        this.displayC = 530;
    };
    AIDevice.prototype.setNotification = function (localNotifications) {
        this.localNotifications = localNotifications;
    };
    AIDevice.prototype.setNativeAudio = function (nativeAudio) {
        this.nativeAudio = nativeAudio;
    };
    AIDevice.prototype.notify = function (type, content) {
        if (__WEBPACK_IMPORTED_MODULE_0__app_app_base__["a" /* AppBase */].Setting.alert != "Y") {
            return;
        }
        var time = new Date();
        var ida = type.toString() + time.getFullYear().toString() + time.getMonth().toString() + time.getDate().toString()
            + time.getHours().toString() + (time.getMinutes() / 10).toString();
        var id = parseInt(ida);
        if (this.notifylist[id] == undefined) {
            if (__WEBPACK_IMPORTED_MODULE_0__app_app_base__["a" /* AppBase */].IsMobileWeb == false) {
                try {
                    if (type == 3) {
                        var that = this;
                        var fallinterval = setInterval(function () {
                            that.nativeAudio.play("fall");
                            that.t++;
                            if (that.fall != "Y") {
                                that.t = 0;
                                clearInterval(fallinterval);
                            }
                        }, 1000);
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
                        var that = this;
                        var faninterval = setInterval(function () {
                            that.nativeAudio.play("fanshen2");
                            this.localNotifications.schedule({
                                id: id,
                                text: content,
                                vibrate: true
                            });
                            if (that.fan != "Y") {
                                clearInterval(faninterval);
                            }
                        }, 60000 * 5);
                    }
                    else if (type == 4) {
                        this.localNotifications.schedule({
                            id: id,
                            text: content,
                            vibrate: true
                        });
                    }
                    else {
                        this.nativeAudio.play("wet");
                        this.localNotifications.schedule({
                            id: id,
                            text: content,
                            vibrate: true,
                            sound: "nosound"
                        });
                    }
                }
                catch (e) {
                }
            }
            this.notifylist[id] = 1;
        }
    };
    return AIDevice;
}());

//# sourceMappingURL=aidevice.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(373);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_mall_mall__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_shengming_shengming__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_local_notifications__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_ble__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_record_api__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_app_update__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_native_audio__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_mall_mall__["a" /* MallPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_shengming_shengming__["a" /* ShengmingPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    backButtonText: "",
                    iconMode: "ios",
                    modalEnter: "modal-slide-in",
                    modalLeave: "modal-slide-out",
                    tabsPlacement: "bottom",
                    pageTransition: "ios",
                    backButtonIcon: "ios-arrow-back",
                    statusbarPadding: false
                }, {
                    links: [
                        { loadChildren: '../pages/scan/scan.module#ScanPageModule', name: 'ScanPage', segment: 'scan', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_mall_mall__["a" /* MallPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_shengming_shengming__["a" /* ShengmingPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_ble__["a" /* BLE */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_17__providers_record_api__["a" /* RecordApi */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_app_update__["a" /* AppUpdate */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_native_audio__["a" /* NativeAudio */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_base__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_update__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storage, appUpdate) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            console.log(platform);
            try {
                //appUpdate.checkAppUpdate("http://cmsdev.app-link.org/alucard263096/aidiaper/api/apkupdate/version").then(
                //(ret)=>{
                //alert(JSON.stringify(ret));
                //}
                //);
            }
            catch (e) {
                //alert(JSON.stringify(e));
            }
            __WEBPACK_IMPORTED_MODULE_5__app_base__["a" /* AppBase */].IsIos = platform.is("ios");
            ;
            __WEBPACK_IMPORTED_MODULE_5__app_base__["a" /* AppBase */].IsAndroid = platform.is("android");
            __WEBPACK_IMPORTED_MODULE_5__app_base__["a" /* AppBase */].IsMobileWeb = platform.is("mobileweb");
            __WEBPACK_IMPORTED_MODULE_5__app_base__["a" /* AppBase */].Storage = storage;
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/steve/Documents/GitHub/AIDiaper/Source/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_update__["a" /* AppUpdate */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 217,
	"./af.js": 217,
	"./ar": 218,
	"./ar-dz": 219,
	"./ar-dz.js": 219,
	"./ar-kw": 220,
	"./ar-kw.js": 220,
	"./ar-ly": 221,
	"./ar-ly.js": 221,
	"./ar-ma": 222,
	"./ar-ma.js": 222,
	"./ar-sa": 223,
	"./ar-sa.js": 223,
	"./ar-tn": 224,
	"./ar-tn.js": 224,
	"./ar.js": 218,
	"./az": 225,
	"./az.js": 225,
	"./be": 226,
	"./be.js": 226,
	"./bg": 227,
	"./bg.js": 227,
	"./bm": 228,
	"./bm.js": 228,
	"./bn": 229,
	"./bn.js": 229,
	"./bo": 230,
	"./bo.js": 230,
	"./br": 231,
	"./br.js": 231,
	"./bs": 232,
	"./bs.js": 232,
	"./ca": 233,
	"./ca.js": 233,
	"./cs": 234,
	"./cs.js": 234,
	"./cv": 235,
	"./cv.js": 235,
	"./cy": 236,
	"./cy.js": 236,
	"./da": 237,
	"./da.js": 237,
	"./de": 238,
	"./de-at": 239,
	"./de-at.js": 239,
	"./de-ch": 240,
	"./de-ch.js": 240,
	"./de.js": 238,
	"./dv": 241,
	"./dv.js": 241,
	"./el": 242,
	"./el.js": 242,
	"./en-au": 243,
	"./en-au.js": 243,
	"./en-ca": 244,
	"./en-ca.js": 244,
	"./en-gb": 245,
	"./en-gb.js": 245,
	"./en-ie": 246,
	"./en-ie.js": 246,
	"./en-il": 247,
	"./en-il.js": 247,
	"./en-nz": 248,
	"./en-nz.js": 248,
	"./eo": 249,
	"./eo.js": 249,
	"./es": 250,
	"./es-do": 251,
	"./es-do.js": 251,
	"./es-us": 252,
	"./es-us.js": 252,
	"./es.js": 250,
	"./et": 253,
	"./et.js": 253,
	"./eu": 254,
	"./eu.js": 254,
	"./fa": 255,
	"./fa.js": 255,
	"./fi": 256,
	"./fi.js": 256,
	"./fo": 257,
	"./fo.js": 257,
	"./fr": 258,
	"./fr-ca": 259,
	"./fr-ca.js": 259,
	"./fr-ch": 260,
	"./fr-ch.js": 260,
	"./fr.js": 258,
	"./fy": 261,
	"./fy.js": 261,
	"./gd": 262,
	"./gd.js": 262,
	"./gl": 263,
	"./gl.js": 263,
	"./gom-latn": 264,
	"./gom-latn.js": 264,
	"./gu": 265,
	"./gu.js": 265,
	"./he": 266,
	"./he.js": 266,
	"./hi": 267,
	"./hi.js": 267,
	"./hr": 268,
	"./hr.js": 268,
	"./hu": 269,
	"./hu.js": 269,
	"./hy-am": 270,
	"./hy-am.js": 270,
	"./id": 271,
	"./id.js": 271,
	"./is": 272,
	"./is.js": 272,
	"./it": 273,
	"./it.js": 273,
	"./ja": 274,
	"./ja.js": 274,
	"./jv": 275,
	"./jv.js": 275,
	"./ka": 276,
	"./ka.js": 276,
	"./kk": 277,
	"./kk.js": 277,
	"./km": 278,
	"./km.js": 278,
	"./kn": 279,
	"./kn.js": 279,
	"./ko": 280,
	"./ko.js": 280,
	"./ky": 281,
	"./ky.js": 281,
	"./lb": 282,
	"./lb.js": 282,
	"./lo": 283,
	"./lo.js": 283,
	"./lt": 284,
	"./lt.js": 284,
	"./lv": 285,
	"./lv.js": 285,
	"./me": 286,
	"./me.js": 286,
	"./mi": 287,
	"./mi.js": 287,
	"./mk": 288,
	"./mk.js": 288,
	"./ml": 289,
	"./ml.js": 289,
	"./mn": 290,
	"./mn.js": 290,
	"./mr": 291,
	"./mr.js": 291,
	"./ms": 292,
	"./ms-my": 293,
	"./ms-my.js": 293,
	"./ms.js": 292,
	"./mt": 294,
	"./mt.js": 294,
	"./my": 295,
	"./my.js": 295,
	"./nb": 296,
	"./nb.js": 296,
	"./ne": 297,
	"./ne.js": 297,
	"./nl": 298,
	"./nl-be": 299,
	"./nl-be.js": 299,
	"./nl.js": 298,
	"./nn": 300,
	"./nn.js": 300,
	"./pa-in": 301,
	"./pa-in.js": 301,
	"./pl": 302,
	"./pl.js": 302,
	"./pt": 303,
	"./pt-br": 304,
	"./pt-br.js": 304,
	"./pt.js": 303,
	"./ro": 305,
	"./ro.js": 305,
	"./ru": 306,
	"./ru.js": 306,
	"./sd": 307,
	"./sd.js": 307,
	"./se": 308,
	"./se.js": 308,
	"./si": 309,
	"./si.js": 309,
	"./sk": 310,
	"./sk.js": 310,
	"./sl": 311,
	"./sl.js": 311,
	"./sq": 312,
	"./sq.js": 312,
	"./sr": 313,
	"./sr-cyrl": 314,
	"./sr-cyrl.js": 314,
	"./sr.js": 313,
	"./ss": 315,
	"./ss.js": 315,
	"./sv": 316,
	"./sv.js": 316,
	"./sw": 317,
	"./sw.js": 317,
	"./ta": 318,
	"./ta.js": 318,
	"./te": 319,
	"./te.js": 319,
	"./tet": 320,
	"./tet.js": 320,
	"./tg": 321,
	"./tg.js": 321,
	"./th": 322,
	"./th.js": 322,
	"./tl-ph": 323,
	"./tl-ph.js": 323,
	"./tlh": 324,
	"./tlh.js": 324,
	"./tr": 325,
	"./tr.js": 325,
	"./tzl": 326,
	"./tzl.js": 326,
	"./tzm": 327,
	"./tzm-latn": 328,
	"./tzm-latn.js": 328,
	"./tzm.js": 327,
	"./ug-cn": 329,
	"./ug-cn.js": 329,
	"./uk": 330,
	"./uk.js": 330,
	"./ur": 331,
	"./ur.js": 331,
	"./uz": 332,
	"./uz-latn": 333,
	"./uz-latn.js": 333,
	"./uz.js": 332,
	"./vi": 334,
	"./vi.js": 334,
	"./x-pseudo": 335,
	"./x-pseudo.js": 335,
	"./yo": 336,
	"./yo.js": 336,
	"./zh-cn": 337,
	"./zh-cn.js": 337,
	"./zh-hk": 338,
	"./zh-hk.js": 338,
	"./zh-tw": 339,
	"./zh-tw.js": 339
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 452;

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppLang; });
var AppLang = /** @class */ (function () {
    function AppLang() {
    }
    AppLang.cn = function () {
        var ret = [];
        ret["home"] = "首页";
        ret["history"] = "历史记录";
        ret["mall"] = "商城";
        ret["setting"] = "设置";
        ret["findingsensor"] = "正在寻找智能感应器";
        ret["findandclick"] = "找到以下设备，点击目标设备";
        ret["devicename"] = "设备名";
        ret["status"] = "状态";
        ret["clicked"] = "扣上";
        ret["opened"] = "打开";
        ret["address"] = "地址";
        ret["signal"] = "信号强度";
        ret["battery"] = "电量";
        ret["usetime"] = "已使用时长";
        ret["temperature"] = "温度";
        ret["generalindex"] = "综合舒适指数";
        ret["forecastniaoliang"] = "预测<br />尿量";
        ret["xishouliang"] = "可吸收量";
        ret["urgent"] = "应急<br />提醒";
        ret["urgenttips"] = "应急提醒";
        ret["nodata"] = "暂无";
        ret["fallcare"] = "摔倒护理";
        ret["sleepmonitor"] = "睡姿<br />监控";
        ret["posttime"] = "睡时长";
        ret["usersetting"] = "用户设置";
        ret["sound"] = "声音";
        ret["on"] = "开";
        ret["off"] = "关";
        ret["accurrency"] = "灵敏度";
        ret["shushi_0"] = "最节约";
        ret["shushi_1"] = "经济";
        ret["shushi_2"] = "平衡";
        ret["shushi_3"] = "舒适";
        ret["shushi_4"] = "最舒适";
        ret["status_0"] = "舒适";
        ret["status_1"] = "干爽";
        ret["status_2"] = "适中";
        ret["status_3"] = "微潮";
        ret["status_4"] = "潮湿";
        ret["havebeenunconnect"] = "已断开连接";
        ret["unconnected"] = "已断开连接";
        ret["second"] = "秒";
        ret["minite"] = "分钟";
        ret["hour"] = "小时";
        ret["no"] = "无";
        ret["s"] = "秒";
        ret["m"] = "分钟";
        ret["h"] = "小时";
        ret["selectleft"] = "左睡";
        ret["selectright"] = "右睡";
        ret["selectup"] = "仰睡";
        ret["selectdown"] = "卧睡";
        ret["timetochange"] = "翻身时间到了，请及时护理，谢谢！";
        ret["falltohelp"] = "跌落了，请赶快处理";
        ret["msg_0"] = "目前感觉非常舒适";
        ret["msg_1"] = "目前状态良好";
        ret["msg_2"] = "目前状态适中";
        ret["msg_3"] = "纸尿裤状态已经微湿，请立即更换";
        ret["msg_4"] = "纸尿裤状态已经不舒服，请立即更换";
        ret["unconnec"] = "断开";
        ret["connect"] = "打开";
        ret["nodeviceconnect"] = "目前无法获得设备信息";
        ret["clickopenandchange"] = "夹子打开了，请更换纸尿裤";
        ret["basesetting"] = "基础设置";
        ret["cn"] = "中文";
        ret["en"] = "英语";
        ret["alert"] = "报警";
        ret["home"] = "首页";
        ret["size"] = "码数";
        ret["fanshentips"] = "翻身提醒";
        ret["noalert"] = "不提醒";
        ret["usestatement"] = "使用声明";
        ret["rescan"] = "重新扫描设备";
        ret["record_1"] = "尿湿记录";
        ret["record_2"] = "跌落记录";
        ret["record_3"] = "用片统计";
        ret["record_4"] = "尿量统计";
        ret["daterange"] = "日期范围";
        ret["datadetail"] = "数据详情";
        ret["nodatanow"] = "暂无记录";
        ret["time"] = "时间";
        ret["status"] = "状态";
        ret["peeml"] = "尿量";
        ret["startuse"] = "开始使用";
        ret["startpee"] = "开始尿湿";
        ret["peetips"] = "尿湿提醒";
        ret["changepaper"] = "更换尿布";
        ret["date"] = "日期";
        ret["usetime"] = "用品次数";
        ret["day1"] = "当日";
        ret["day7"] = "近7日";
        ret["day14"] = "近14日";
        ret["day30"] = "近30日";
        //this.Lang["ci"]
        ret["ci"] = "次";
        ret["dao"] = "到";
        ret["fallhappen"] = "发生跌落日期";
        ret["fallcount"] = "发生跌落次数";
        ret["language"] = "语言";
        ret["ok"] = "确定";
        ret["cancel"] = "取消";
        ret["state_1"] = "1、本产品所有监测数据仅供护理参考，不可用于医疗诊断依据；";
        ret["state_2"] = "2、本产品具有“摔倒护理”报警功能，使用过程如有偏差，在产品设计可允许误差范围内；报警数据与多重因素有关，故该功能仅供参考；";
        ret["state_3"] = "3、本产品所有解释权归广东互爱健康产业科技有限公司所有。";
        ret["卧"] = "卧";
        ret["左"] = "左";
        ret["仰"] = "仰";
        ret["右"] = "右";
        return ret;
    };
    AppLang.en = function () {
        var ret = [];
        ret["home"] = "Home";
        ret["history"] = "History";
        ret["mall"] = "Mall";
        ret["setting"] = "Setting";
        ret["findingsensor"] = "Finding Smart Device";
        ret["findandclick"] = "Find devices below, click to monitor";
        ret["devicename"] = "Device Name";
        ret["status"] = "Status";
        ret["clicked"] = "Clicked";
        ret["opened"] = "Open";
        ret["address"] = "Device ID";
        ret["signal"] = "Signal";
        ret["battery"] = "Battry";
        ret["usetime"] = "Use Time";
        ret["temperature"] = "Temperature";
        ret["generalindex"] = "Comfortable";
        ret["forecastniaoliang"] = "Urine";
        ret["xishouliang"] = "Absorbable";
        ret["urgent"] = "Urgent";
        ret["urgenttips"] = "Urgent Alarm";
        ret["nodata"] = "No Data";
        ret["fallcare"] = "Falling Care";
        ret["sleepmonitor"] = "Posture";
        ret["posttime"] = "Time";
        ret["usersetting"] = "User Setting";
        ret["sound"] = "Sound";
        ret["on"] = "On";
        ret["off"] = "Off";
        ret["accurrency"] = "Sensitivity";
        ret["shushi_0"] = "Most Economical";
        ret["shushi_1"] = "Economical";
        ret["shushi_2"] = "Balance";
        ret["shushi_3"] = "Comfortable";
        ret["shushi_4"] = "Most Comfortable";
        ret["status_0"] = "Comfortable";
        ret["status_1"] = "Dry";
        ret["status_2"] = "Moderate";
        ret["status_3"] = "Moistish";
        ret["status_4"] = "Wet";
        ret["havebeenunconnect"] = "Disconnected";
        ret["unconnected"] = "Disconnected";
        ret["second"] = "Second";
        ret["minite"] = "Minute";
        ret["hour"] = "Hour";
        ret["no"] = "No";
        ret["s"] = "s";
        ret["m"] = "m";
        ret["h"] = "h";
        ret["selectleft"] = "Left";
        ret["selectright"] = "Right";
        ret["selectup"] = "Up";
        ret["selectdown"] = "Down";
        ret["timetochange"] = "Time to turn over, please take care!";
        ret["falltohelp"] = "Falling, please help!";
        ret["msg_0"] = "Feel comfortable";
        ret["msg_1"] = "Fell good";
        ret["msg_2"] = "Fell ok";
        ret["msg_3"] = "Diaper is wet, please replace it.";
        ret["msg_4"] = "Diaper is very wet, replace it immediately.";
        ret["unconnec"] = "disconnected";
        ret["connect"] = "Connect";
        ret["nodeviceconnect"] = "Lost device now.";
        ret["clickopenandchange"] = "Device is unclicked, please check it.";
        ret["basesetting"] = "Base Setting";
        ret["cn"] = "Chinese";
        ret["en"] = "English";
        ret["alert"] = "Alarm";
        ret["home"] = "Home";
        ret["size"] = "Size";
        ret["fanshentips"] = "Turn over";
        ret["noalert"] = "No Alarm";
        ret["usestatement"] = "Use Statement";
        ret["rescan"] = "Re-scan";
        ret["record_1"] = "Wet";
        ret["record_2"] = "Falling";
        ret["record_3"] = "Use";
        ret["record_4"] = "Volume";
        ret["daterange"] = "Date Range";
        ret["datadetail"] = "Detail";
        ret["nodatanow"] = "No record";
        ret["time"] = "Time";
        ret["status"] = "Status";
        ret["peeml"] = "Urine Volume";
        ret["startuse"] = "Start";
        ret["startpee"] = "First Wet";
        ret["peetips"] = "Wet Alarm";
        ret["changepaper"] = "Replace";
        ret["date"] = "Date";
        ret["usetime"] = "Use time";
        ret["day1"] = "Today";
        ret["day7"] = "Weekly";
        ret["day14"] = "Biweekly";
        ret["day30"] = "Monthly";
        ret["ci"] = "times";
        ret["dao"] = "to";
        ret["fallhappen"] = "Falling date";
        ret["fallcount"] = "Falling times";
        ret["language"] = "Language";
        ret["ok"] = "Ok";
        ret["cancel"] = "Cancel";
        ret["state_1"] = "1. All monitoring data of this product is for nursing reference only and cannot be used for medical diagnosis";
        ret["state_2"] = "2. This product has the \"Drop Alarm\" function. If there is a deviation in the use process, it is within the allowable error range of the product design; the alarm data is related to multiple factors, so this function is for reference only";
        ret["state_3"] = "3. All interpretation rights of this product belong to Guangdong Carelder Health Industry Technology Co., Ltd.        ";
        ret["卧"] = "";
        ret["左"] = "";
        ret["仰"] = "";
        ret["右"] = "";
        return ret;
    };
    AppLang.getLang = function (lang) {
        if (lang == AppLang.lastlang) {
            return AppLang.Lang;
        }
        if (lang == "en") {
            AppLang.Lang = AppLang.en();
        }
        else {
            AppLang.Lang = AppLang.cn();
        }
        //alert(JSON.stringify(AppLang.Lang["home"]));
        return AppLang.Lang;
    };
    AppLang.Lang = [];
    AppLang.lastlang = "";
    return AppLang;
}());

//# sourceMappingURL=app.lang.js.map

/***/ })

},[350]);
//# sourceMappingURL=main.js.map