import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLang = '';

  constructor(private cookie: CookieService,
              private translate: TranslateService
  ){}

  changeLanguage(lang: string){
    this.cookie.set('lang', lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
