import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthorizationService) { }
  success_registration:boolean= false;
  failed_registration:boolean=false;
  failed_detail='';

  ngOnInit(): void {
  }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const attributeArray = [{
      Name: 'name',
      // Value: 'Akshat Tulsani'
      Value: form.value.name
    }
  ];
  
    this.auth.register(email, password,attributeArray).subscribe(
      (data) => {        
        console.log("Success check email for verification link",data);
        this.success_registration=true;
        this.failed_registration=false;
      },
      (err) => {
        console.log(err);
        this.failed_detail = err.message;
        // this.error = "Registration Error has occurred";
        this.failed_registration=true;
        this.success_registration=false;

      }
    );
  }

}
