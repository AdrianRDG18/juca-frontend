import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public currentLang: String = '';

  constructor(private cookie: CookieService,
              private translate: TranslateService
  ){}

  changeLanguage(lang: string){
    this.cookie.set('lang', lang, { path: '/' });
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
