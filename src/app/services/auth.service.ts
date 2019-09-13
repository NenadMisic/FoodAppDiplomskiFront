import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserToRegister } from '../shared/userToRegister.model';
import { LoginUser } from '../shared/loginUser.model';
import { Router } from '@angular/router';

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
  user = new User('', 'Uloguj se', 0);
  isLoged = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: LoginUser): Observable<any> {
    const jsonUser = JSON.stringify(user);
    console.log(jsonUser);
    console.log(`${environment.url}/auth/login`);
    return this.http.post(`${environment.url}/auth/login`, jsonUser, this.httpOptions
    ).pipe(map((receivedUser: User) => {
      this.user = receivedUser;
      this.isLoged = true;
      this.userSubject.next(this.user);
    }, err => {
      console.log(err);
    }));
  }
  register(userToRegister: UserToRegister): Observable<any> {
    const user = JSON.stringify(userToRegister);
    return this.http.post(`${environment.url}/auth/register`, user, this.httpOptions
    ).pipe(map((receivedUser: User) => {
      this.user = receivedUser;
      this.userSubject.next(this.user);
    }, err => {
      console.log(err);
    }));
  }
  logout() {
    this.isLoged = false;
    this.user.setDefault();
    this.router.navigateByUrl('/restorani');
    /*return this.http.post(`${environment.url}/auth/logout`, this.httpOptions)
    .pipe();*/
  }



}
