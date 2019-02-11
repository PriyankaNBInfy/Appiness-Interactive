import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean =false;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.loginForm.invalid) {
      const users= JSON.parse(localStorage.getItem('users'));

      users.forEach(element => {
        if(element.userName == this.loginForm.controls.username.value 
          || element.email == this.loginForm.controls.username.value ||
          element.mobileNumber == this.loginForm.controls.username.value) {
            if(element.password == this.loginForm.controls.password.value) {
              this.router.navigate(['/home'], {queryParams: {'currentUser': JSON.stringify(element)}});
            }
          }
      });
    }


  }
}
