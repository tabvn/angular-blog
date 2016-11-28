import {Component, OnInit} from '@angular/core';
import {User} from "./user/user";
import {AuthService} from "./user/auth.service";
import {isNullOrUndefined} from "util";
import {UserService} from "./user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';

  user: User = new User();
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {

    this.user = this.authService.getCurrentUser();
    if (this.user && !isNullOrUndefined(this.user)) {

      this.loggedIn = true;
    }


  }

  ngOnInit(){

    this.authService.onAuthChange$.subscribe(user => {
      if(user){
        // this mean user has logged in.
        this.loggedIn = true;
      }else{

        // user has logged out.
        this.loggedIn = false;
      }

    });

  }


  logout() {
    this.loggedIn = false;
    this.userService.logout();
    this.authService.logout();

    //direct after loggout to the homepage.

    this.router.navigate(['/home']);


  }


}
