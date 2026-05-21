import {Component, inject} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {RouterOutlet} from '@angular/router';
import translationsEN from "../../public/i18n/en.json";
import translationsNL from "../../public/i18n/nl.json";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MagnifierComponent} from './magnifier/magnifier.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, TranslateModule, MagnifierComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private translateService = inject(TranslateService);

  constructor() {
    this.initialiseTranslateService();
  }

  private initialiseTranslateService() {
    this.translateService.addLangs(['nl', 'en']);
    this.translateService.setTranslation('en', translationsEN)
    this.translateService.setTranslation('nl', translationsNL)
  }

}
