import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: User = new User();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();

    if(this.user === null){

      // redirect to the login page
     this.router.navigate(['/user/login']);
    }
  }

}
