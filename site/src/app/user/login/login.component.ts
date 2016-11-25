import {Component, OnInit} from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {


  user: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }


  onLogin() {

    console.log("login tapped with data: ", this.user);

    // we have uuser login data. now post to the api server. to verify account. and get the access token key.

    // generate new service.

    let user = this.user;
    this.userService.login(user.username, user.password).subscribe(response => {

      console.log(response);
      // now we need save user token to the cookie. or now i just simply save to Local storage.

      let user = response.user;
      this.authService.setUser(user);

      let token = response.id;

      this.authService.setToken(token);

      // now we need redirect to profile user if they logged in.

      this.router.navigate(['/user/my-account']);


    }, err => {

      console.log(err);
    })

  }

}
