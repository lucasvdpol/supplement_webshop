import {Component, inject} from '@angular/core';
import {AccountComponent} from '../account/account.component';
import {ShoppingcartComponent} from '../shoppingcart/shoppingcart.component';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    AccountComponent,
    ShoppingcartComponent
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router)
  private translateService = inject(TranslateService)

  protected imagePathDutch = "assets/dutchflag.jpg"
  protected imagePathEnglish = "assets/englishflag.png"
  protected dutchFlag = true;

  protected currentFlag(){
    if(this.dutchFlag){
      return this.imagePathDutch;
    }else{
      return this.imagePathEnglish;
    }
  }


  switchLanguage(){
    this.dutchFlag = !this.dutchFlag;
    if(this.dutchFlag){
      this.translateService.use('nl')
    }else{
      this.translateService.use('en')
    }
  }

  protected goToHomePage(){
    this.router.navigate(['/']);
  }

  get logoImage(){
    return "assets/Logo.webp"
  }
}
