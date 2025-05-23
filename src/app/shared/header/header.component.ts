import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { SweetAlertService } from '../../services/swal.service';
import Swal from 'sweetalert2';
import { ImageService } from '../../services/image.service';
import { CatchErrorService } from '../../services/catch-error.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public user?: User;

  constructor(private _authService: AuthService,
              private _swal: SweetAlertService,
              private _imageService: ImageService,
              private _catchError: CatchErrorService,
              private _router: Router,
              private _translateService: TranslateService
  ){
    this.user = this._authService.user;
    this.setImage();
  }

  setImage(){
    if(this.user?.image == null || ''){
      this.user!.image = './assets/images/profile/without-image.webp';
    }else{
      this._swal.swalProcessingRequest();
      Swal.showLoading();
      this._imageService.getImage(this.user.image)
          .subscribe({
            next: (image: any) => this.user!.image = image,
            error: (error: any) => {
              console.log(error);
              this._catchError.scaleError('Error', error);
            },
            complete: () => Swal.close()
          });
    }
  }

  findByTerm(term:string){

  }

  logout(){
    this._swal.swalConfirm(this._translateService.instant("sidebar.logout"), this._translateService.instant("sidebar.logoutMsg"))
        .then( (result) => {
          if(result.isConfirmed){
            localStorage.removeItem('token');
            this._router.navigateByUrl('/login');
          }
        });
  }

}
