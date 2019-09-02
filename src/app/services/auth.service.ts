import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  user: User;
  isLoged = false;

  constructor(private http: HttpClient) { }

  public getUserByUsername(username: string): Observable<any> {
    return this.http.get(
      `${environment.url}/login`,
      {/*headers: this.httpOptions.headers,*/ params: {params: JSON.stringify(username)}}
    ).pipe();
  }

}
