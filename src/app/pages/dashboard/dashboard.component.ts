import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

  constructor(private _settingsService: SettingsService){}
}
