import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user: User = new User();


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }


  onRegister(){


    this.userService.register(this.user).subscribe(res => {

      console.log("An account has been created with information: ", res);

      this.router.navigate(['/user/login']);

    }, err => {

      console.log(err);
    });

  }
}
