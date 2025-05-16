import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { XssSanitizerService } from '../../../services/xss-sanitizer.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: ``
})
export class EditUserComponent {

  @Input() user: User | null = null;
  @Output() close = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @ViewChild('closeUserEditModal') closeUserEditModal!: ElementRef; // ref to #closeUserEditModal in html
  xssSanitizer = inject(XssSanitizerService); //This for sanitize the value comes from db to prevent xss

  editUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  ngOnInit(){
    //Sanitize data comes from db and apply it on form
    this.editUserForm.patchValue({
      name: this.xssSanitizer.sanitize(this.user!.name),
      email: this.xssSanitizer.sanitize(this.user!.email),
      role: this.user!.role,
      status: this.user!.status
    });
  }

  getControlErrors(control_name: string, display_name: string): string[] {
    const control = this.editUserForm?.get(control_name);
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

  closeModal(): void{
    this.close.emit();
  }

  updateUser(): void{
    if(this.editUserForm.valid){
      //Sanitize data before send to db
      let userUpdated = this.xssSanitizer.sanitizeArray(this.editUserForm.value);
      this.update.emit({...userUpdated, uid: this.user?.uid } ); //Pass data to parent component
    }
  }

  //Function to close the modal after update user request in users.component.ts(Parent component)
  closeModalAfterRequest(){
    this.closeUserEditModal.nativeElement.click();
  }

}
