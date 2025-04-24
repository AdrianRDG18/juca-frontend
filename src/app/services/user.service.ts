import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_base_url = environment.API_BASE_URL;

  constructor(private _httpClient: HttpClient){}

  get tokenOnHeader(): Object{
    return { headers: { "x-token" : localStorage.getItem('token') || null }}
  }

  getUserById(user_id: string): Observable<User>{
    return this._httpClient.get(this.api_base_url+'/users/get_by_id/'+user_id, this.tokenOnHeader)
               .pipe(
                map((resp: any) => {
                  return resp.user;
                })
               )
  }

}
