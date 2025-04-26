import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public theme = document.querySelector('#theme-id') as HTMLLIElement;

  /**
  * Set theme first time | set theme by definition in localStorage
  *
  * @returns void
  */
  setThemeFirstTime(){
    const initialTheme = localStorage.getItem('theme') || 'default-dark';
    this.theme?.setAttribute('href', `./assets/css/colors/${initialTheme}.css`);
  }
  
  /**
  * Change theme by selected theme
  *
  * @param selected_theme
  * @param theme_options
  * @returns void
  */
  changeTheme(theme: string, theme_options: Array<Element>){
    localStorage.setItem('theme', theme);
    this.theme.setAttribute('href', `./assets/css/colors/${theme}.css`);
    this.replaceIconBySelectedTheme(theme_options);
  }

  /**
   * 
   * Set/change icon(✓) of selected theme
   * 
   * @param theme_options 
   * @returns void
   */
  replaceIconBySelectedTheme(theme_options: Array<Element>){
    theme_options.map( themeOption => {

      themeOption.classList.remove('working');

      const configured_theme = themeOption.getAttribute('data-theme');
      const current_theme = this.theme.getAttribute('href');

      if(`./assets/css/colors/${configured_theme}.css` == current_theme){
        themeOption.classList.add('working');
      }
    });
  }

}
