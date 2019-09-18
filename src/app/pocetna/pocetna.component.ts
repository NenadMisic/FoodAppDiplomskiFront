import { Component, OnInit, OnDestroy } from '@angular/core';
import { JelaService } from '../services/jela.service';
import { Jelo } from '../shared/jelo.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit, OnDestroy {

  hrana: Jelo[];
  hranaSub: Subscription;
  foodOverlayOpen = false;
  hoverOverJelo: string;
  isLoged: boolean;

  constructor(private jelaService: JelaService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.isLoged = this.auth.isLoged;
    this.auth.userSubject.subscribe(user => {
      this.isLoged = this.auth.isLoged;
    });
    this.hranaSub = this.jelaService.getNajpopularnijeDB().subscribe(hrana => {
      this.hrana = hrana;
    });
  }

  onJeloClick(jelo: Jelo) {
    this.jelaService.setIzabranoJelo(jelo);
    console.log('/restorani', jelo.restoranName, jelo.name);
    this.router.navigate(['/restorani', jelo.restoranName, jelo.name]);
  }

  onJeloMouseOver(jeloName: string) {
    this.foodOverlayOpen = true;
    this.hoverOverJelo = jeloName;
  }

  onJeloMouseLeave() {
    this.foodOverlayOpen = false;
  }

  ngOnDestroy() {
    if (this.hranaSub) {
      this.hranaSub.unsubscribe();
    }
  }

}
