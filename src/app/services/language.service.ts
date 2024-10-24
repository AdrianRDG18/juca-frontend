import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private cookie: CookieService){}

  changeLanguage(lang: string){
    this.cookie.set('lang', lang);
  }
}
