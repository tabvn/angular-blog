import {Component, OnInit} from '@angular/core';
import {User} from "./user/user";
import {AuthService} from "./user/auth.service";
import {isNullOrUndefined} from "util";
import {UserService} from "./user/user.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {PostService} from "./blog/post.service";
import {Post} from "./blog/blog/post";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]
})
export class AppComponent implements OnInit{
  title = 'app works!';

  user: User = new User();
  loggedIn: boolean = false;

  private searchTerm = new Subject<string>();



  posts: Post[] = [];

  autocompleteBox = {hide: true};


  constructor(private postService: PostService, private authService: AuthService, private userService: UserService, private router: Router) {

    this.user = this.authService.getCurrentUser();
    if (this.user && !isNullOrUndefined(this.user)) {

      this.loggedIn = true;
    }


    this.searchTerm.debounceTime(200).distinctUntilChanged().subscribe(searchTerm => {


      this.postService.search(searchTerm).subscribe(response => {

        this.posts = response as Post[];

        this.autocompleteBox.hide = false;

      }, err => {

        console.log(err);

      });


    });





  }

  ngOnInit(){

    this.authService.onAuthChange$.subscribe(user => {
      if(user){
        // this mean user has logged in.
        this.loggedIn = true;
        this.user = user;
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


  onKeyup(searchText: string){

    if(searchText !== ""){
      this.searchTerm.next(searchText);
    }

  }

  showDetail(post: Post){

    this.autocompleteBox.hide = true;

    this.router.navigate(['/blog', post.id]);


  }

}
