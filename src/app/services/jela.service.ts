import { Injectable } from '@angular/core';
import { Jelo } from '../shared/jelo.model';
import { Ingredient } from '../shared/ingredient.model';
import { Nutrition } from '../shared/nutrition.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JelaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private izabranoJelo: Jelo;
  private najpopularnijaHrana: Jelo[] = [];

  constructor(private http: HttpClient) { }

  public getNajpopularnije(): Jelo[] {
    return this.najpopularnijaHrana;
  }

  public getNajpopularnijeDB(): Observable<any> {
    return this.http.get<Jelo[]>(`${environment.url}/restorani/restoran/jela/all`).pipe(
      map(jela => {
        this.najpopularnijaHrana = [];
        jela.forEach(jelo => {
          this.najpopularnijaHrana.push(jelo);
        });
        return this.najpopularnijaHrana;
      })
    );
  }
  public dodajNajpopularniju(novoJelo: Jelo) {
    this.najpopularnijaHrana.push(novoJelo);
  }

  public getIzabranoJelo(): Jelo {
    if (this.izabranoJelo) {
      return this.izabranoJelo;
    }
    return null;
  }

  public setIzabranoJelo(jelo: Jelo) {
    this.izabranoJelo = jelo;
  }

  public findJeloByName(jeloName: string, restoranName: string): Observable<any> {
    // return this.najpopularnijaHrana.filter((jelo: Jelo) => jelo.name === jeloName);
    return this.http.get(`${environment.url}/restorani/${restoranName}/${jeloName}`).pipe();
  }

  public getJelaZaRestoran(imeRestorana: string): Observable<any> {
    // return this.najpopularnijaHrana.filter((jelo: Jelo) => jelo.restoran.replace(/\s/g, '_') === imeRestorana.replace(/\s/g, '_'));
    return this.http.get(`${environment.url}/restorani/${imeRestorana}/jelovnik`).pipe();
  }

  public addJelo(imeRestorana: string, jelo: Jelo): Observable<any> {
    return this.http.post(`${environment.url}/restorani/${imeRestorana}/add`, jelo, this.httpOptions).pipe();
  }

  public editJelo(imeRestorana: string, jelo: Jelo): Observable<any> {
    return this.http.put(`${environment.url}/restorani/${imeRestorana}/edit`, jelo, this.httpOptions).pipe();
  }

  public deleteJelo(imeRestorana: string, imeJela: string): Observable<any> {
    return this.http.delete(`${environment.url}/restorani/${imeRestorana}/delete/${imeJela}`).pipe();
  }

}
