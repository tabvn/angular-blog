import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Post} from "./blog/post";

@Injectable()
export class PostService {


  serverUrl = "http://0.0.0.0:3000/api";


  constructor(private http: Http) {
  }


  headers = new Headers({

    'Content-Type': 'application/json',
  });

  getPosts(): Observable<Post[]> {

    let url = this.serverUrl + "/posts";
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


  createPost(post: Post): Observable<any>{

    let url = this.serverUrl + "/posts";
    return this.http.post(url, post, {headers: this.headers}).map(res => res.json()).catch(err => {

      return Observable.throw(err);
    })
  }

}
