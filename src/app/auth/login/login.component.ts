import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../../services/swal.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { CatchErrorService } from '../../services/catch-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _swal: SweetAlertService,
              private _auth: AuthService,
              private _catchError: CatchErrorService
  ){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email_remember'), [ Validators.required, Validators.email ]),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });

  formSubmited: boolean = false;

  login(){
    this.formSubmited = true;
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      (this.loginForm.get('remember')?.value)? localStorage.setItem('email_remember', this.loginForm.get('email')?.value): localStorage.removeItem('email_remember');
      this._swal.swalProcessingRequest();
      Swal.showLoading();
      this._auth.login(this.loginForm.value)
                .subscribe({
                  next: (resp: any) =>{
                    console.log(resp);
                  }, error: (error) =>{
                    console.log(error);
                    this._catchError.scaleError('Something went wrong on login', error);
                  }, complete: () => Swal.close()
                });
    }
  }

  fieldValidation(field_name: string): boolean{
    if(this.loginForm.get(field_name)?.invalid && this.formSubmited){
      return true;
    }
    return false;
  }

}
