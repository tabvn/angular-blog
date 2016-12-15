import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../post.service";
import {Post} from "../blog/post";
import {Comment} from "../comment/comment";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {


  post: Post = new Post();
  comments: Comment[] = [];
  postId: string = "";



  constructor(private route: ActivatedRoute,
              protected postService: PostService) {
  }

  ngOnInit() {


    this.route.params.switchMap((params: Params) => {

      let id = params['id'];

      this.postId = id;

      let query = {
        include: ["comments"]
      };
      let filter = encodeURI(JSON.stringify(query));

      return this.postService.getPost(id, filter);
    }).subscribe(response => {

      this.post = response;
      this.comments = response.comments;


    }, err => {

      console.log(err);
    });

  }





  onNewComment(event){

    this.comments.push(event);


  }





}
