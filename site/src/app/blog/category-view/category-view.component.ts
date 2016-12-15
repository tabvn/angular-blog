import { Component, OnInit } from '@angular/core';
import {Post} from "../blog/post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../post.service";
import {Category} from "../category.model";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  posts: Post[] = [];

  category: Category = new Category()

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {


    let categoryId = this.route.snapshot.params["id"];


    let query = {
      include: ["posts"]
    };

    let filter = encodeURI(JSON.stringify(query));

    this.postService.getCategoryById(categoryId, filter).subscribe(res => {

      this.category  = res;

      this.posts = res.posts;

    });






  }

}
