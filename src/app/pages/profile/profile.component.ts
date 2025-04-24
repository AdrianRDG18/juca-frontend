import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CatchErrorService } from '../../services/catch-error.service';
import { SweetAlertService } from '../../services/swal.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {

  public user?: User;

  public profileForm = new FormGroup({
    full_name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password_conf: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  formSubmited: boolean = false;

  constructor(private _userService: UserService,
              private _authService: AuthService,
              private _catchError: CatchErrorService,
              private _swal: SweetAlertService
  ){
    this.user = this._authService.user;
    this.profileForm.patchValue({
      full_name: this.user!.name,
      email: this.user!.email,
    });
    this.getUser();
  }
  
  getUser(){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._userService.getUserById(this.user!.uid)
        .subscribe({
          next: (user:User) => {
            console.log('Resp:' + user.email);
          }, error: (error) => {
            this._catchError.scaleError('Somethin wen wrong on getUser', error);
          }, complete: () => Swal.close()
        });
  }

  updateUser(){
    console.log(this.profileForm);
    this.formSubmited = true;
    if(this.profileForm.valid){
      console.log('Valida!')
    }
  }

}
