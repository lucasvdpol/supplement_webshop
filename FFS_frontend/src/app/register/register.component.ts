import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {RegisterService} from '../services/register.service';
import {Login} from '../models/login.model';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private router = inject(Router);
  private registerService = inject(RegisterService);
  protected errorMessage = "";
  showPassword = false;


  protected registerForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required]),
    }
  );

  onRegister(){
    let user_email= this.registerForm.get('email')?.value;
    let user_password= this.registerForm.get('password')?.value;
    if(user_email != null && user_password != null){
      const subscription = this.registerService.register(
        user_email,
        user_password
      )
      subscription.subscribe({
        next: (responseData) =>{
          this.router.navigate(['login']);
        },
        error: (error) =>{
          this.errorMessage = error.error.message;
        }
      })
    }

  }


  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
