import {Injectable} from '@angular/core';
import {User} from "./user";
import {isNullOrUndefined} from "util";

@Injectable()
export class AuthService {



  constructor() {

  }


  setUser(user: User) {

    let userString = JSON.stringify(user);
    localStorage.setItem("currentUser", userString);

  }

  getCurrentUser(): User {

    let userString = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(userString)) {
      let user: User = JSON.parse(userString);

      return user;
    } else {

      return null;
    }
  }

  setToken(token: string) {

    localStorage.setItem("accessToken", token);
  }

  getToken(): string {

    return localStorage.getItem("accessToken");
  }

  logout(){


    // we need also request logout to the server api

    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");

  }

}
