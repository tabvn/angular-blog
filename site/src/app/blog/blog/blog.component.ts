import { Component, OnInit } from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "./post";
import {isNullOrUndefined} from "util";
import {Category} from "../category.model";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [PostService]
})
export class BlogComponent implements OnInit {


  title: string = "Blog";
  posts: Post[] = [];

  categories: Category[] = [];

  pager = {
    limit: 2, // this is default number of posts load one time.
    current: 0, // current page.
    reachedEnd: false,
    isLoading: false,
  };

  query = {
    limit: this.pager.limit,
    skip: this.pager.limit * this.pager.current
  };

  constructor(private postService: PostService) { }

  ngOnInit() {

    // do request and get all blog entries

   this.getAll();

   // get categories

    this.postService.getCategories().subscribe(res => {

      this.categories = res as Category[];



    }, err => {

      console.log(err);
    });


  }


  getAll(){


    this.query.limit = this.pager.limit;
    this.query.skip = this.pager.limit * this.pager.current;

    let filter = encodeURI(JSON.stringify(this.query));

    this.postService.getPosts(filter).subscribe(res => {

      // stop loading icon of pager

      this.pager.isLoading = false;

      if(!isNullOrUndefined(res) && res.length){
        // we have posts here

        this.posts = this.posts.concat(res);
      }else{

        this.pager.reachedEnd = true;

      }

      // now we detect if user has been reached to the end of the list.

    }, err => {

      // as well if detech error we also stop loading icon .

      this.pager.isLoading = false;

      console.log(err);
    })


  }
  loadMore(){

    // when click load more we need increase the current + 1 and fetch the blog posts
    // if current page 0. we skip: = limit * current
    this.pager.isLoading = true;
    this.pager.current = this.pager.current + 1;
    this.getAll();

  }

}
