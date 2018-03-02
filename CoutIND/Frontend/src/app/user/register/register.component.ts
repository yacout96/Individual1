import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  template: `\`

  <div class="col-md col-md-offset-2">
  <form [formGroup]="myForm" class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
          <div class="form-group">
              <div>
                  <label for="uname">Username :</label>
                  <input type="text" id="uname" class="form-control"
                         formControlName="userNameField" ngModel></div>

              
              <div>
                  <label for="fname">First Name :</label>
                  <input type="text" id="fname" class="form-control"
                         formControlName="firstNameField" ngModel></div>

              <div>
                  <label for="lname">Last Name :</label>
                  <input type="text" id="lname" class="form-control"
                         formControlName="lastNameField" ngModel>
              </div>

              <div>
                  <label for="pass">Password :</label>
                  <input type="password" id="pass" class="form-control"
                         formControlName="passwordField" ngModel>
              </div>

              <div>
                  <label for="email">Email :</label>
                  <input type="text" id="email" class="form-control"
                         formControlName="emailField" ngModel>
              </div>

          </div>
          <button class="btn btn-primary" [disabled]="!myForm.valid" type="submit">Sign me up!</button>
      </form>
  </div>
  `
})
export class RegisterComponent implements OnInit{


    myForm: FormGroup;

    constructor(private http: HttpClient,private router: Router){

    }

    onSubmit(user){

        console.log(user.userName);
        console.log(user.password);
        var data = JSON.stringify({username:user.userNameField,password:user.passwordField,firstname:user.firstNameField,lastname:user.lastNameField,email:user.emailField})

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        
        this.http.post(environment.apiUrl+'register', data, config)
        .subscribe(res=>{
          console.log(res);
        });
    }

    ngOnInit() {
        var userloggedin = localStorage.getItem("user");
    if(userloggedin){
      this.router.navigate(["/dashboard"]);
    }
        this.myForm = new FormGroup({
            userNameField: new FormControl(null, Validators.required),
            firstNameField: new FormControl(null, Validators.required),
            lastNameField: new FormControl(null, Validators.required),
            emailField: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            passwordField: new FormControl(null, Validators.required)


        });
}}