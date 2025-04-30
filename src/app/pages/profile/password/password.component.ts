import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { samePasswordValidatorFactory } from '../../../validators/same-pw-validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styles: ``
})
export class PasswordComponent {

  translateService = inject(TranslateService);
  formSubmited: boolean = false;

  passwordForm: FormGroup = new FormGroup({
    current_pw: new FormControl('', [Validators.required, Validators.minLength(6)]),
    new_pw: new FormControl('', [Validators.required, Validators.minLength(6)]),
    conf_new_pw: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, {
    validators: samePasswordValidatorFactory(this.translateService)
  });

  updatePassword(){
    console.log(this.passwordForm);
    this.formSubmited = true;

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
