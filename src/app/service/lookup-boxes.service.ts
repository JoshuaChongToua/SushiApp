import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupBoxesService {

  constructor(private http:HttpClient) { }

  public getBoxes() : Observable<any> {
    return this.http.get(environment.apiBaseUrl)
  }


}
