import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(private formBuilder: FormBuilder) { 
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validator: this.ConfirmedValidator('password', 'confirmPassword')
    })
  }

  signupForm!: FormGroup

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors && !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
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

  passwordDoesNotMatch() {
    return 'Password does not match'
  }

  getEmailErrorMessage() {
    if (this.signupForm.controls['email'].hasError('required')) {
      return 'Email is Required!!';
    }
    return this.signupForm.controls['email'].hasError('pattern') ? 'Invalid email' : '';
  }

}
