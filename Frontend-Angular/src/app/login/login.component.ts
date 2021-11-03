import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 
import {NgForm} from "@angular/forms";
import { AuthorizationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthorizationService,private router:Router) { }
  login_failed:boolean=false;
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    
    this.auth.signIn(email,password).subscribe((data)=>{
      console.log("working",data);
      this.router.navigate(["/all-movies"]);
    },(err)=>{
      console.log("Incorrect Credentials",err);
      this.login_failed = true;
    }); 
  }

}
