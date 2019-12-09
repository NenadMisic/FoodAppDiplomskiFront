import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';
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

  defaultUser = new User('', 'Uloguj se', 0);
  userSubject: Subject<User> = new Subject<User>();
  user: User = this.defaultUser;
  isLoged = false;

  constructor(private http: HttpClient, private router: Router) {
    this.hasLoggedUser().subscribe((res: User) => {
      if (res !== null) {
        this.user = res;
        this.isLoged = true;
        this.userSubject.next(this.user);
      } else {
        this.logout();
      }
    });
  }

  hasLoggedUser() {
    return this.http.get(`${environment.url}/loged`).pipe(take(1));
  }

  login(user: LoginUser): Observable<any> {
    const jsonUser = JSON.stringify(user);
    return this.http.post(`${environment.url}/auth/login`, jsonUser, this.httpOptions
    ).pipe(map((receivedUser: User) => {
      this.user = receivedUser;
      this.isLoged = true;
      this.userSubject.next(this.user);
    }, err => {
      console.error(err);
    }));
  }
  register(userToRegister: UserToRegister): Observable<any> {
    const user = JSON.stringify(userToRegister);
    return this.http.post(`${environment.url}/auth/register`, userToRegister, this.httpOptions
    ).pipe(map((receivedUser: User) => {
      this.user = receivedUser;
      this.isLoged = true;
      this.userSubject.next(this.user);
    }, err => {
      console.error(err);
    }));
  }
  logout() {
    this.isLoged = false;
    this.user = this.defaultUser;
    this.userSubject.next(this.user);
    this.router.navigateByUrl('/restorani');
    return this.http.post(`${environment.url}/auth/logout`, this.httpOptions).pipe();
  }
}
