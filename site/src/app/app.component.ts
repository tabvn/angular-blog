import { Component } from '@angular/core';
import {User} from "./user/user";
import {AuthService} from "./user/auth.service";
import {isNullOrUndefined} from "util";
import {UserService} from "./user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  user: User = new User();
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private userService: UserService){

    this.user = this.authService.getCurrentUser();
    if(this.user && !isNullOrUndefined(this.user)){

      this.loggedIn = true;
    }
  }


  logout(){
    this.loggedIn = false;
    this.userService.logout();
    this.authService.logout();

  }


}
