import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CatchErrorService {

  scaleError(title: string, error: any){

    let errors = '';

    if(Object.keys(error).indexOf('error') > -1) {

      if(Object.keys(error.error).indexOf('errors') > -1) {

        //It could be a validations error
        const fields = Object.keys(error.error.errors);
        fields.forEach(element => {
          errors += `<strong>${element}</strong>: ${error.error.errors[element].msg} <br>`;
        });

      } else if(Object.keys(error.error).indexOf('error') > -1) {

        const fields = Object.keys(error.error.error);
        console.log(fields);
        fields.forEach(element => {
          errors += `<strong>${element}</strong>: ${error.error.error[element]} <br>`;
        });

      }else if(Object.keys(error.error).indexOf('msg') > -1 ){
        errors = `<strong>Error:</strong> ${error.error.msg}`;
      }else{
        errors = error.message;
      }
    }

    return Swal.fire({
      icon: 'error',
      title: title,
      html: ` <pre> ${errors} </pre>`,
      confirmButtonColor: '#0871EF',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false
    });
  }
}
