import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieDataService } from '../movie-data.service';
import { AuthorizationService } from '../auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private http:HttpClient, private dataService:MovieDataService,private auth:AuthorizationService) { }

  movieList :any;

  ngOnInit(): void {
    let params = new HttpParams();
    params =params.append('searchType','getAll');
    this.dataService.getAllMovies(params).subscribe((resp)=>{
      console.log(resp,typeof resp);
      this.movieList = resp;
    });
  }

  onmovieRent(selectedMovie){
    let userDetail=this.auth.getUserAttributes().subscribe((result)=>{
      userDetail = result;
      console.log(userDetail);
    let userMovieObj = {"director":selectedMovie["director"],
    "description":selectedMovie["description"],"genre":selectedMovie["genre"],
    "title":selectedMovie["title"],"cast":selectedMovie["cast"],"movietilelink":selectedMovie["movietilelink"]}
    console.log(userMovieObj);
    let reqBody = {"rentMovieID":selectedMovie.title,"useremail":userDetail.email,"movieObj":userMovieObj};
    console.log(reqBody);
     this.dataService.rentMovie(reqBody).subscribe((resp)=>{
      if(resp){
        alert(resp.toString());
        this.ngOnInit();
      }
    });
    });
  }

}
