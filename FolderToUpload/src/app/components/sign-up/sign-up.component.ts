import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  showLogin: boolean = false;
  showConfirmPassword: boolean = false;
  submitted: Boolean = false;
  signUpForm: FormGroup;
  users: any[] = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      name: ['', Validators.required],
      email1: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9 ]*')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9 ]*')]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }
  get f() { return this.signUpForm.controls; }

  onSubmit() {
      this.submitted = true;

      if(this.signUpForm.controls.password.value !== this.signUpForm.controls.confirmPassword.value){
        this.showConfirmPassword = true;
      }
      // stop here if form is invalid
      if (!this.signUpForm.invalid) {
          this.users.push(this.signUpForm.value);
          localStorage.setItem('users', JSON.stringify(this.users));
          this.showLogin = true;
      }

    }
}
