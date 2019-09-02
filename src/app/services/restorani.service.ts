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
    console.log(this.activeRestoran.name + ' ' + this.activeRestoran.name.length);
    return this.activeRestoran;
  }

  public findRestoranByName(name: string): Observable<any> {
    // return this.restorani.filter((restoran: Restoran) => restoran.name === name);
    return this.http.get(`${environment.url}/restorani/${name}/full`).pipe();
  }

}
