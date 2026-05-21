import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {Login} from '../models/login.model';
import {Token} from '../models/token.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: boolean = false;
  private httpClient = inject(HttpClient);
  private token: string | null = null;
  private role: string  | null = null;
  private email: string | null = null;
  protected apiUrl = environment.apiUrl;

  public isLoggedIn() {
    return this.loggedIn;
  }

  constructor(){
    this.loadTokenFromLocalStorage();
    if (this.token != null) {
      this.loggedIn = true;
      this.role = this.getRoleFromToken();
    }
  }

  public getRoleFromToken(): string | null {
    if (!this.token) return null;
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      return null;
    }
  }

  private loadTokenFromLocalStorage() {
    this.token = localStorage.getItem('authToken');
    this.email = localStorage.getItem('email');
    if (this.token) {
      this.role = this.getRoleFromToken();
    } else {
      this.role = null;
    }
  }

  public login(login: Login) {
    const subscription = this.httpClient.post<Token>(
      this.apiUrl + '/auth/login',
      {
        email: login.email,
        password: login.password
      }
    ).pipe(
      tap((responseData) => {
        if(responseData.token){
          this.loggedIn = true;
          this.saveTokenInLocalStorage(responseData.token, responseData.email);
          this.token = responseData.token;
          this.role = responseData.role;
          this.email = responseData.email;
        }
      })
    )
    return subscription;
  }

  private saveTokenInLocalStorage(token: string, email: string){
    localStorage.setItem('authToken', token);
    localStorage.setItem('email', email);
  }

  public getAuthtoken(){
    return this.token;
  }


  public getEmail(){
    return this.email;
  }

  public isAdmin(){
    return this.role === 'ROLE_ADMIN';
  }

  public removeTokenLocalStorage(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
  }

  public logout(){
    this.removeTokenLocalStorage();
    this.loggedIn = false;
    this.token = null;
    this.role = null;
    this.email = null;
  }

  public isTokenExpired(): boolean {
    if (!this.token) {
      return true;
    }
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      const expiration = payload.exp * 1000;
      return expiration < Date.now();
    } catch (e) {
      this.removeTokenLocalStorage();
      return true;
    }
  }

  isValidUser(){
    if (!this.token) {
      return false;
    }
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      const email = payload.email;
      return localStorage.getItem('email') == email;

    } catch (e) {
      this.removeTokenLocalStorage();
      return true;
    }
  }
}
