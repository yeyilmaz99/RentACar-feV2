import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { signupStart } from '../state/auth.actions';
import { Register } from 'src/app/models/register.model';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm:FormGroup;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    })
  }

  onSignUpSubmit(){
    if(!this.signUpForm.valid){return;}
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const firstName = this.signUpForm.value.firstName;
    const lastName= this.signUpForm.value.lastName
    const register:Register = {email:email,password:password,firstName:firstName,lastName:lastName}
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.store.dispatch(signupStart({register}))
  }

}
