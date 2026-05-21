import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  public register(email: string, password: string) {
    return this.httpClient
      .post<string>(this.apiUrl + '/auth/register', {
        email: email,
        password: password,
      })
  }
}
