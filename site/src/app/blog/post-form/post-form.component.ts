import {Component, OnInit} from '@angular/core';
import {Post} from "../blog/post";
import {PostService} from "../post.service";
import {Router} from "@angular/router"; // this thanks to Webstorm :)

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  providers: [PostService]
})
export class PostFormComponent implements OnInit {


  post: Post = new Post();

   errorMessage = "";


  constructor(
    private postService: PostService,
    private router: Router

  ) {
  }

  ngOnInit() {


  }

  onSubmit() {


    // let do post this data to rest service...

    this.postService.createPost(this.post).subscribe(res => {

      // we got successful the post
      console.log(res.id); // this is post ID we can use to redirect to view the detail of the post.

      // direct to view post

      this.router.navigate(['/blog', res.id]);

    }, err => {

      console.log(err);
      this.errorMessage = "An error saving the post.";
    })


  }

}
