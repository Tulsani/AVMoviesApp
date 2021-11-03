import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../auth.service';
import { HttpParams } from '@angular/common/http';
import { MovieDataService } from '../movie-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetail:any;
  rentedMovies:any;

  constructor(private auth:AuthorizationService,private dataService:MovieDataService) { }

  ngOnInit(): void {
    this.auth.getUserAttributes().subscribe((result)=>{
      console.log(result);
      this.userDetail=result;
      let params = new HttpParams();
      params = params.append("searchType","userInfo");
      params = params.append("emailId",this.userDetail.email);
      this.dataService.getUserRentedMovies(params).subscribe((resp)=>{
        if(resp){
          console.log(resp,resp[0]["rented"]);
          this.rentedMovies = resp[0]["rented"];
        }
      });
    });
  }

}
