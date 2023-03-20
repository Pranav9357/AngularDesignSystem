import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  constructor(private formBuilder: FormBuilder) {}

  signupForm!: FormGroup

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  getPasswordErrorMessage() {
    if (this.signupForm.controls['password'].hasError('required')) {
      return 'Password is Required!!';
    }

    return this.signupForm.controls['password'].hasError('minlength') ? 'Password must be of atleast 6 character' : '';
  } 

  getConfirmPasswordErrorMessage() {
    if (this.signupForm.controls['confirmPassword'].hasError('required')) {
      return 'Confirm password is Required!!';
    }
    
    return this.signupForm.controls['confirmPassword'].hasError('minlength') ? 'confirm password must be of atleast 6 character' : '';
  } 
  
  getEmailErrorMessage() {
    if (this.signupForm.controls['email'].hasError('required')) {
      return 'Email is Required!!';
    }
    return this.signupForm.controls['email'].hasError('pattern') ? 'Invalid email' : '';
  }

}
