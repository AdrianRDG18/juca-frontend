import { Component, effect, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'juca-frontend';

  cookie =  inject(CookieService);
  languageService = inject(LanguageService);

  cookieLogEffect = effect(() => {
    console.log({ cookie: this.cookie.get('lang')});
    const lang = this.cookie.check('lang') ? this.cookie.get('lang') : 'en';
    this.languageService.changeLanguage(lang);
  });

}
