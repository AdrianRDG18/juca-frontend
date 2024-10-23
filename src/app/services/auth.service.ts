import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_BASE_URL = environment.API_BASE_URL;

  constructor(private _http: HttpClient){}

  login(login_data: any): Observable<any>{

    return this._http.post(`${this.API_BASE_URL}/login`, login_data)
                      .pipe(
                        tap((resp: any)=>{
                          localStorage.setItem('token', resp.token)
                        })
                      );

  }

}
