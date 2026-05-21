import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);
  protected hideError = true;
  showPassword = false;

  protected loginForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required]),
    }
  );

  onLogin() {
    const email = this.loginForm.get('email')!.value!;
    const password = this.loginForm.get('password')!.value!;
    const subscription = this.loginService.login({email: email, password: password});
    subscription.subscribe({
      next: (responseData) =>{
        this.router.navigate(['products']);
      },
      error: (error) =>{
        this.hideError = false;
      }
    })
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  onRegister(){
    this.router.navigate(['register']);
  }
}
