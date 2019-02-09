import {Http} from '@angular/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath= "https://api.themoviedb.org/3"
  private api_key= "13c56ffdfeecf3187f66a24e339fed39"

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatesMovies(page = 1){
   //rota para consumir a API 
   return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.api_key);
  }

  getMovieDetail(filmeid){
    //rota para consumir a API 
    return this.http.get(this.baseApiPath +  `/movie/${filmeid}?api_key=`  + this.api_key);
    //return this.http.get(this.baseApiPath +  "/movie/505954/api_key="  + this.api_key);

   }
}
