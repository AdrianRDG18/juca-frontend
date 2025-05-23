import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitStyleFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService){
    this.settingsService.setThemeFirstTime();
  }
  
  ngOnInit(): void {
    customInitStyleFunctions();
  }

}
