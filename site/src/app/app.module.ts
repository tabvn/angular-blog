import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog/blog.component';
import {Routes,RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: 'blog', component: BlogComponent },
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},

];



@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
