import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CatchErrorService } from '../../../services/catch-error.service';
import { SweetAlertService } from '../../../services/swal.service';
import { User } from '../../../models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styles: ``
})
export class PersonalInfoComponent {

  public user?: User;

  public profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private _userService: UserService,
              private _authService: AuthService,
              private _catchError: CatchErrorService,
              private _swal: SweetAlertService,
              private _translateService: TranslateService
  ){
    this.user = this._authService.user;
    this.profileForm.patchValue({
      name: this.user!.name,
      email: this.user!.email,
    });
  }

  getControlErrors(control_name: string, display_name: string): string[] {
    const control = this.profileForm?.get(control_name);
    if (control?.errors) {
      return Object.keys(control.errors)
                   .map( (errorKey: string) => {
                     return this.getErrorMessage(errorKey, control.errors?.[errorKey], display_name)
                   });
    }
    return [];
  }

  private getErrorMessage(errorKey: string, errorValue: any, display_name: string): string {
    const errorMessages: { [key: string]: (errorValue: any) => string } = {
      'required': () => `${display_name} is required.`,
      'minlength': () => `${display_name} must be at least ${errorValue.requiredLength} characters long.`,
      'email': () => 'Please enter a valid email address.'
      // Add other error messages here as needed
    };
    return errorMessages[errorKey] ? errorMessages[errorKey](errorValue) : `Unknown error: ${errorKey}`;
  }

  updateUser(){
    if(this.profileForm.valid ){

      this._swal.swalConfirm(this._translateService.instant("profilePage.updateUser"), this._translateService.instant("profilePage.confirmUpdate")).then((result) =>{
        if(result.isConfirmed){
          this._swal.swalProcessingRequest();
          Swal.showLoading();
          this._userService.updatePersonaInfo(this.profileForm.value, this.user!.uid)
              .subscribe({
                next: (resp:any) => {
                  this._swal.swalSuccess('OK', resp.msg);
                  const { name, email} = resp.userUpdated;
                  this.user!.name = name;
                  this.user!.email = email;
                },
                error: (error) => {
                  console.log(error);
                  this._catchError.scaleError('Something was wrong in updateUser', error);
                }
              });
        }
      });

    }
  }

}
