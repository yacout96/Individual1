import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  template: `
  <form class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
  <input type = "text" class="form-control" name = "username" placeholder = "Enter your Username" ngModel>
  <br>
  <input type = "password" class="form-control" name = "password" placeholder = "Enter your password" ngModel>
  <br>
  <input class="btn btn-success" type = "submit" value = "submit">
  </form>
  <br />
  {{error}}
`
})
export class LoginComponent implements OnInit{

  ngOnInit(){
    var user = localStorage.getItem("user");
    if(user){
      this.router.navigate(["/dashboard"]);
    }
  }

  constructor(private http: HttpClient,private router: Router){

  }

onSubmit = function(user){
  var data = JSON.stringify({username:user.username,password:user.password})

var config = {
    headers : {
        'Content-Type': 'application/json'
    }
}

this.http.post(environment.apiUrl+'/login', data, config)
.subscribe(res=>{
  console.log(res);
  let token = res.token;
    if (token) {
        // set token property
        this.token = token;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify({ username: user.username, token: token }));
        this.error = "Login successful";
        this.router.navigate(["/dashboard"]);
    }else{
      this.error = "Sorry, incorrect credentials";
    }
  }
);
  
  
}

}