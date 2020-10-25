import { Injectable } from '@angular/core';
import { Restoran } from '../shared/restoran.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestoraniService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private activeRestoran: Restoran;
  private restorani: Restoran[] = [];

  constructor(private http: HttpClient) { }

  public getRestorani(): Restoran[] {
    return this.restorani;
  }

  public getRestoraniDB(): Observable<any> {
    return this.http.get<Restoran[]>(`${environment.url}/restorani/all`).pipe(
      map(restorani => {
        this.restorani = [];
        restorani.forEach(restoran => {
          this.restorani.push(restoran);
        });
        return this.restorani;
      })
    );
  }

  public setActiveRestoran(restoran: Restoran) {
    this.activeRestoran = restoran;
  }

  public getActiveRestoran(): Restoran {
    if (!this.activeRestoran) {
      return null;
    }
    return this.activeRestoran;
  }

  public findRestoranByName(name: string): Observable<any> {
    // return this.restorani.filter((restoran: Restoran) => restoran.name === name);
    return this.http.get(`${environment.url}/restorani/${name}/full`).pipe();
  }

  public addRestoran(restoran: Restoran): Observable<any> {
    return this.http.post(`${environment.url}/restorani/add`, restoran, this.httpOptions).pipe();
  }

  public editRestoran(restoran: Restoran, prevName: string): Observable<any> {
    return this.http.put(`${environment.url}/restorani/update/${prevName}`, restoran, this.httpOptions).pipe();
  }

  public deleteRestoran(restoranName: string): Observable<any> {
    return this.http.delete(`${environment.url}/restorani/delete/${restoranName}`, this.httpOptions).pipe();
  }
}
