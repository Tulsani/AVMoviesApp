import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieDataService } from '../movie-data.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchString:any = "";
  constructor(private http:HttpClient, private dataService:MovieDataService, private router:Router, private auth: AuthorizationService) { }

  ngOnInit(): void {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(["/"]);
      
    }
    else{
     var user = this.auth.getAuthenticatedUser();
     console.log("user data",user);

    }
  }
  onSearch(){

    console.log(this.searchString);
    let params = new HttpParams();
    params =params.append("searchType","custom");
    params= params.append("searchString",this.searchString);
    console.log(this.searchString,params);
    this.dataService.searchMovies(params).subscribe((result:Object[])=>{
      console.log("results from search",result);
      let uniqueResults = [...new Map(result.map(item =>
        [item["title"], item])).values()];
      console.log(uniqueResults);
      var searchResult = JSON.stringify(uniqueResults);
      this.dataService.sendSearchQuery(searchResult);
      this.router.navigate(['/search']);
    });

  }

  SignOut(){
    this.auth.logOut();
    this.router.navigate(["/"]);
  }

}
