import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {


  headers = new Headers({
    "Content-Type": "application/json",
    'Authorization': this.authService.getToken(),
  });

  serverUrl = "http://0.0.0.0:3000/api";

  constructor(private http:Http, private authService: AuthService) {



  }


  login(username: string, password: string): Observable<any>{

    let url = this.serverUrl + "/Users/login?include=user";

    return this.http.post(url, {username: username, password: password}, {headers: this.headers}).map(res => res.json()).catch(err => {

      return Observable.throw(err);
    })
  }

  logout(): Observable<any>{

    let url = this.serverUrl + '/Users/logout';
    let data = {accessTokenID: this.authService.getToken()};
    return this.http.post(url, data, {headers: this.headers}).map(res => res.json()).catch(err => {
     return Observable.throw(err);
    });
  }

}
