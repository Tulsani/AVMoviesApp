import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  
  private avMovieurl = "https://edk2a46n1h.execute-api.ap-south-1.amazonaws.com/default/avMovieAPI";

  private searchQuery = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient) { }

  $searchQuery = this.searchQuery.asObservable();

  sendSearchQuery(data:string){
    this.searchQuery.next(data);
  }

  getAllMovies(params){
    return this.httpClient.get(this.avMovieurl,{params});
  }
  getUserRentedMovies(params){
    return this.httpClient.get(this.avMovieurl,{params});
  }

  searchMovies(params){
    return this.httpClient.get(this.avMovieurl,{params});
  }

  rentMovie(postBody){
    return this.httpClient.post(this.avMovieurl,JSON.stringify(postBody));
  }
}
