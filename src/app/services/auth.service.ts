 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, tap, of} from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_BASE_URL = environment.API_BASE_URL;
  public user?: User;
  
  constructor(private _http: HttpClient){}
  
  get tokenHeader() : any{
    return { headers: { 'x-token': localStorage.getItem('token') }};
  }

  login(login_data: any): Observable<any>{

    return this._http.post(`${this.API_BASE_URL}/login`, login_data)
                      .pipe(
                        tap((resp: any)=>{
                          localStorage.setItem('token', resp.token)
                        })
                      );

  }

  validateToken(): Observable<boolean>{
    return this._http.get(`${this.API_BASE_URL}/login/renew`, this.tokenHeader)
               .pipe(
                map( (resp: any) => {
                  //Extract only the info we need from the response.user
                  const { uid, name, email, role, status, image, google } = resp.user;
                  //Save the info extracted in the user model to use in all application
                  this.user = new User(uid, name, email, role, status, '', image, google);
                  //Set the token renewed from backend
                  localStorage.setItem('token', resp.token);
                  //Return true because the token was renewed successfully
                  return true;
                }), catchError( error => {
                  console.log(error);
                  return of(false);
                })
               );
  }

}
