import {Component, OnInit} from '@angular/core';
import {Post} from "../blog/post";
import {PostService} from "../post.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import post = http.post;
import {Observable} from "rxjs"; // this thanks to Webstorm :)

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  providers: [PostService]
})
export class PostFormComponent implements OnInit {


  post: Post = new Post();

  errorMessage = "";
  loading = false;
  defaultBodyValue: string = "";


  constructor(private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {


    if (this.route.snapshot.params['id']) {
      this.route.params.switchMap((params: Params) => {

        let id = params['id'];
        if (typeof params['id'] !== "undefined" && params['id'] !== null) {


          this.loading = true;
          return this.postService.getPost(id); // we can see an error if params["id"] is undefined or null. let check..
        }


      }).subscribe(res => {

        // after get the post detail we set loading to false.
        this.loading = false;
        this.post = res as Post; // if post is being edit. we get the id from params , and get detail of the post via postService.

        this.defaultBodyValue = this.post.body;


      }, err => {

        console.log(err);
      });
    }


  }

  onSubmit() {


    // if the post.id is not null that mean we need update the post. otherwise create new post

    if (this.post.id) {

      // do save the post

      this.postService.updatePost(this.post).subscribe(res => {

        // this mean the post has been saved
        // now we can redirect to the post view.
        this.router.navigate(['/blog', this.post.id]);

      }, err => {

        console.log(err); // this for development only.
        this.errorMessage = "An error saving the post.";
      });


    } else {

      // let do post this data to rest service...

      this.postService.createPost(this.post).subscribe(res => {

        // we got successful the post
        console.log(res.id); // this is post ID we can use to redirect to view the detail of the post.

        // direct to view post

        this.router.navigate(['/blog', res.id]);

      }, err => {

        console.log(err);
        this.errorMessage = "An error saving the post.";
      });


    }


  }


  onBodyTextEditorKeyUp(textValue){

    this.post.body = textValue;
  }

}
