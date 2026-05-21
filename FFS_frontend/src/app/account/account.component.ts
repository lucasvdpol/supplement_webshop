import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  private router = inject(Router);
  private loginService = inject(LoginService);

  onClickAccount(){
    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['account/account-page']);
    }
  }

}
