import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { SweetAlertService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public user?: User;

  menu: any[] = [
    {
      title: 'Admin',
      icon: 'mdi mdi-folder-lock-open',
      role_required: 'ADMIN_ROLE',
      submenu: [
        {
          title: 'Users',
          route: 'users',
          role_required: 'ADMIN_ROLE'
        }
      ]
    }
  ]

  constructor(private _authService: AuthService,
              private _swal: SweetAlertService,
              private _router: Router,
              private _translateService: TranslateService
  ){
    this.user = this._authService.user;
  }
  
  logout(){
    this._swal.swalConfirm(this._translateService.instant("headerComponent.logout"), this._translateService.instant("headerComponent.logoutMsg"))
        .then( (resp) => {
          if(resp.isConfirmed){
            localStorage.removeItem('token');
            this._router.navigateByUrl('/login');
          }
        });
  }

}
