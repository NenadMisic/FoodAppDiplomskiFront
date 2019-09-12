import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { UserToRegister } from '../shared/userToRegister.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  userSubject: Subject<User> = new Subject<User>();
  user = new User('', 'Uloguj se', false);
  isLoged = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.url}/auth/login`, {email, password}
    ).pipe(tap((user: User) => {
        this.user = user;
        this.userSubject.next(this.user);
      })
    );
  }
  register(userToRegister: UserToRegister): Observable<any>  {
    const user = JSON.stringify(userToRegister);
    return this.http.post(`${environment.url}/auth/register`, user, this.httpOptions
    ).pipe(tap((receivedUser: User) => {
      this.user = receivedUser;
      this.userSubject.next(this.user);
    }));
  }
  logout() {
    this.isLoged = false;
    this.user = null;
    /*return this.http.post(`${environment.url}/auth/logout`, this.httpOptions)
    .pipe();*/
  }



}
