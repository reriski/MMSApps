import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the RedditDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RedditDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RedditDataProvider Provider');
  }
  getRemoteData(){
    
        return new Promise(resolve => {
          this.http.get("http://api.jakarta.go.id/ruang-publik/rptra").subscribe(res => {
            resolve(res);
          }, err => {
            console.log(err);
          });
        });
  }

}
