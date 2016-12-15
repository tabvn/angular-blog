import {Post} from "./blog/post";

export class Category{


  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public posts?: Post[],

  ){



  }
}
