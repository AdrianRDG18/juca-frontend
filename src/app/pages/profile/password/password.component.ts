import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { samePasswordValidatorFactory } from '../../../validators/same-pw-validator';
import { SweetAlertService } from '../../../services/swal.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { CatchErrorService } from '../../../services/catch-error.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styles: ``
})
export class PasswordComponent {

  private translateService = inject(TranslateService);
  private swalService = inject(SweetAlertService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private catchErrorService = inject(CatchErrorService);

  formSubmited: boolean = false;

  passwordForm: FormGroup = new FormGroup({
    current_pw: new FormControl('', [Validators.required, Validators.minLength(6)]),
    new_pw: new FormControl('', [Validators.required, Validators.minLength(6)]),
    conf_new_pw: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, {
    validators: samePasswordValidatorFactory(this.translateService)
  });

  updatePassword(){
    this.formSubmited = true;
    if(this.passwordForm.valid){
     this.swalService.swalConfirm(this.translateService.instant('passwordPage.subtitle'), this.translateService.instant('passwordPage.confirmationMessage'))
         .then((resp: any) => {
          if(resp.isConfirmed){
            this.swalService.swalProcessingRequest();
            Swal.showLoading();
            this.userService.updatePassword(this.passwordForm.value, this.authService.user!.uid)
                .subscribe({
                  next: (resp: any) => this.swalService.swalSuccess(this.translateService.instant('general.success'), resp.msg),
                  error: (error) => {
                    console.log(error);
                    this.catchErrorService.scaleError(`${this.translateService.instant('errors.somethingWrong')}: updatePassword`, error);
                  }, complete: () => {
                    this.passwordForm.reset();
                    this.formSubmited = false;
                  }
                });
          }
         })
    }
  }

  getControlErrors(control_name: string, display_name: string): string[] {
    const control = this.passwordForm?.get(control_name);
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
      'required': () => `${display_name} ${this.translateService.instant('errors.is-required')}`,
      'minlength': () => `${display_name} ${this.translateService.instant('errors.must-be')} ${errorValue.requiredLength} ${this.translateService.instant('errors.characters-long')}`,
      'differentPW': () => errorValue
    };
    return errorMessages[errorKey] ? errorMessages[errorKey](errorValue) : `Unknown error: ${errorKey}`;
  }

}
