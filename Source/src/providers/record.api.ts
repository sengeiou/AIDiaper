import { Injectable } from '@angular/core';
import { Loading} from 'ionic-angular';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecordApi {

    constructor(public http: Http) {

    }

    

//获取所有的广告
public update(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'record/update';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('record/update',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
                  var retjson=res.json(); 
                  console.log(retjson);
      					 return retjson;
      				}else{
                console.log(res);
                return Promise.reject(res);
              }
            })
            .catch(err => {
                console.log(err);
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('record/update',data,err);
            });

        
    }

    public wetting(data, showLoadingModal:boolean=true) {
      var url = ApiConfig.getApiUrl()+'record/wetting';
      var headers = ApiConfig.GetHeader(url, data);
      let options = new RequestOptions({ headers: headers });

      let body=ApiConfig.ParamUrlencoded(data);

      let loading: Loading=null;
      if(showLoadingModal){
        loading = ApiConfig.GetLoadingModal();
      }

      return this.http.post(url, body, options).toPromise()
          .then((res) => {
            if(ApiConfig.DataLoadedHandle('record/wetting',data,res)){
                if(showLoadingModal){
                   ApiConfig.DimissLoadingModal();
                }
                var retjson=res.json(); 
                console.log(retjson);
               return retjson;
            }else{
              console.log(res);
              return Promise.reject(res);
            }
          })
          .catch(err => {
              console.log(err);
              if(showLoadingModal){
                 ApiConfig.DimissLoadingModal();
              }
              return ApiConfig.ErrorHandle('record/wetting',data,err);
          });

      
  }


  public falling(data, showLoadingModal:boolean=true) {
    var url = ApiConfig.getApiUrl()+'record/falling';
    var headers = ApiConfig.GetHeader(url, data);
    let options = new RequestOptions({ headers: headers });

    let body=ApiConfig.ParamUrlencoded(data);

    let loading: Loading=null;
    if(showLoadingModal){
      loading = ApiConfig.GetLoadingModal();
    }

    return this.http.post(url, body, options).toPromise()
        .then((res) => {
          if(ApiConfig.DataLoadedHandle('record/falling',data,res)){
              if(showLoadingModal){
                 ApiConfig.DimissLoadingModal();
              }
              var retjson=res.json(); 
              console.log(retjson);
             return retjson;
          }else{
            console.log(res);
            return Promise.reject(res);
          }
        })
        .catch(err => {
            console.log(err);
            if(showLoadingModal){
               ApiConfig.DimissLoadingModal();
            }
            return ApiConfig.ErrorHandle('record/falling',data,err);
        });

    
}


  

    

}
