import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent implements OnInit{

    //DOM refs
    public theme_options = document.getElementsByClassName('theme-selector');
    public theme_options_arr: Array<Element> = [];

    constructor(private _settingsService: SettingsService){
    }

    ngOnInit(){
      this.theme_options_arr = Array.from(this.theme_options);
      this._settingsService.replaceIconBySelectedTheme(this.theme_options_arr);
    }

    changeTheme(selected_theme: string){
      this._settingsService.changeTheme(selected_theme, this.theme_options_arr);
    }

}
