import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private api_base_url = environment.API_BASE_URL;

  constructor(private _http: HttpClient,
              private _sanitizer: DomSanitizer
  ){}

  getImage(imageID: string){
    return this._http.get(`${this.api_base_url}/images/${imageID}`,
      {
        headers: { 'x-token': localStorage.getItem('token') || ''},
        // When recieve a image via http request(API), the responseType must be 'blob'
        responseType: 'blob' as 'json'
      }).pipe(
        map((imageBlob: any) => {
          // Create a DOMString representing the image
          let objectURL = URL.createObjectURL(imageBlob);
          // Prevent security errors with sanitizer
          return this._sanitizer.bypassSecurityTrustUrl(objectURL);
        })
      );
  }
}
