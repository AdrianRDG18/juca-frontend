import { Component, inject } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.css'
})
export class NoPageFoundComponent {

  location = inject(Location);

  goBack(){
    this.location.back();
  }

}
