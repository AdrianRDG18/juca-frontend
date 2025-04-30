import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

export function samePasswordValidatorFactory(translate: TranslateService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const new_pw = control.get('new_pw');
        const conf_new_pw = control.get('conf_new_pw');

        if (!new_pw || !conf_new_pw)
            return null;

        if (new_pw.value !== conf_new_pw.value) {
            new_pw.setErrors({ differentPW: translate.instant('errors.newPWNotMatchConfirm') });
            conf_new_pw.setErrors({ differentPW: translate.instant('errors.confirmPWNoMatchNew') });
        }

        if ((new_pw.value != '' || conf_new_pw.value != '') && new_pw?.value === conf_new_pw?.value) {
            if (new_pw.hasError('differentPW') && new_pw.errors) {
                delete new_pw.errors['differentPW'];
                new_pw.updateValueAndValidity();
            }
            if (conf_new_pw.hasError('differentPW') && conf_new_pw.errors) {
                delete conf_new_pw.errors['differentPW'];
                conf_new_pw.updateValueAndValidity();
            }
        }

      return null;
    };
}