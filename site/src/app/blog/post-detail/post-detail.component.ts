import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../post.service";
import {Post} from "../blog/post";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {


  post: Post = new Post();

  constructor(private route: ActivatedRoute,
              protected postService: PostService) {
  }

  ngOnInit() {


    this.route.params.switchMap((params: Params) => {

      let id = params['id'];
      return this.postService.getPost(id);
    }).subscribe(response => {

      this.post = response;


    }, err => {

      console.log(err);
    });

  }

}
