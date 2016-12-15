import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Comment} from "../comment";
import {PostService} from "../../post.service";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {



  comment: Comment = new Comment;

  errorMessage: string = "";

  @Input() postId: string = "";
  @Output() newComment: EventEmitter<Comment> = new EventEmitter();



  constructor(private postService: PostService) { }




  ngOnInit() {


    this.comment.postId = this.postId;

  }


  onSubmit(){

    this.postService.addComment(this.comment).subscribe(res => {

      // do later insert comment to the list.
      this.newComment.emit(res as Comment);


    }, err => {
      this.errorMessage = "An error saving the comment. Try again!";
      console.log(err);

    })


  }
}
