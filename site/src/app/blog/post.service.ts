import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Post} from "./blog/post";
import {isNull} from "util";
import {AuthService} from "../user/auth.service";
import {User} from "../user/user";

@Injectable()
export class PostService {


  serverUrl = "http://0.0.0.0:3000/api";


  constructor(private http: Http, private authService: AuthService) {
  }


  headers = new Headers({

    'Content-Type': 'application/json',
    'Authorization': this.authService.getToken(),
  });


  updateHeaders() {

    this.headers.set('Authorization', this.authService.getToken());
  }

  getPosts(filter: string): Observable<Post[]> {

    // in the part we get all the post without filter query, now we need pass the filter
    let url = this.serverUrl + "/posts";

    if (!isNull(filter) && filter !== "") {
      url = url + '?filter=' + filter;
    }
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {

      return Observable.throw(err);
    });
  }


  getPost(id: string): Observable<Post> {

    let url = this.serverUrl + "/posts/" + id;
    return this.http.get(url, {headers: this.headers}).map(res => res.json() as Post).catch(err => {

      return Observable.throw(err);
    });
  }

  getUserPosts(userId: string, filter: string) {


    // in the part we get all the post without filter query, now we need pass the filter
    let url = this.serverUrl + "/accounts/" + userId + "/posts";

    if (!isNull(filter) && filter !== "") {
      url = url + '?filter=' + filter;
    }
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {

      return Observable.throw(err);
    });

  }


  createPost(post: Post): Observable<any> {


    this.updateHeaders();

    let user = this.authService.getCurrentUser() as User;
    let userId = user.id;
    let url = this.serverUrl + "/accounts/" + userId + "/posts";
    return this.http.post(url, post, {headers: this.headers}).map(res => res.json()).catch(err => {

      return Observable.throw(err);
    })
  }

  updatePost(post: Post): Observable<any> {

    this.updateHeaders();

    let url = this.serverUrl + "/posts/" + post.id
    return this.http.put(url, post, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    })
  }

}
