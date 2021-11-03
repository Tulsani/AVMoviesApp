import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '../movie-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  
  movieList:any;
  showError:boolean=false;
  constructor(private dataService:MovieDataService,private router:Router) { }

  ngOnInit(): void {
    this.dataService.$searchQuery.subscribe((result)=>{
      if(result){
        let searchResult = JSON.parse(result);

        this.movieList = searchResult;
        console.log(this.movieList);
        this.showError=false;
        if(!this.movieList.length){
          this.showError = true;
        }
      }
    })
  }

  onmovieRent(selectedMovie){
    let reqBody = {"rentMovieID":selectedMovie.title};
    this.dataService.rentMovie(reqBody).subscribe((resp)=>{
      if(resp){
        alert(resp.toString());
        this.router.navigate(["/all-movies"]);
      }
    });

  }

}
