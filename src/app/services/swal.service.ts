import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  /**
   * Show a success alert
   * 
   * @param title string
   * @param msg string
   * @returns void
   */
  swalSuccess(title: string, msg: string){
    return Swal.fire({
      title: title,
      text: msg,
      icon: 'success',
      confirmButtonColor: '#0ac41e',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false
    });
  }

  /**
   * Show an error alert
   * 
   * @param title string
   * @param msg string
   * @returns void
   */
  swalError(title: string, msg: string){
    return Swal.fire({
      title: title,
      text: msg,
      icon: 'error',
      confirmButtonColor: '#0871EF',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false
    });
  }

  /**
   * Show a loading Alert
   * 
   * @returns waiting to promise's resolve
   */
  swalProcessingRequest(){
    return Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false
    });
  }

  /**
   * Show a confirmation aleert
   * 
   * @param title string
   * @param msg string
   * @returns confirmation alert
   */
  swalConfirm(title: string, msg: string){
    return Swal.fire({
      title: title,
      html: msg,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0871EF',
      cancelButtonColor: '#D4D4D4',
      confirmButtonText: 'Confirm',
    });
  }

}
