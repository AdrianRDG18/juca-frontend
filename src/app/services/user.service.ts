import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Response, Users } from '../interfaces/users.response.interface';

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

  updatePersonaInfo(user_info: any, uid: string){
    return this._httpClient.put(this.api_base_url + '/users/' + uid, user_info, this.tokenOnHeader);
  }

  updatePassword(passwordconfig: any, uid: string){
    return this._httpClient.put(this.api_base_url + '/users/update_password/' + uid, passwordconfig, this.tokenOnHeader);
  }

  getUsers(): Observable<Users>{
    return this._httpClient.get<Response>(`${this.api_base_url}/users`, this.tokenOnHeader)
               .pipe(
                map( (resp: Response) => resp.users)
               );
  }

}
