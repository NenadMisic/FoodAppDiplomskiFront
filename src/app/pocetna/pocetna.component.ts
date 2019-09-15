import { Component, OnInit, OnDestroy } from '@angular/core';
import { JelaService } from '../services/jela.service';
import { Jelo } from '../shared/jelo.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit, OnDestroy {

  hrana: Jelo[];
  hranaSub: Subscription;
  user1: User;
  user2: User;
  foodOverlayOpen = false;
  hoverOverJelo: string;

  constructor(private jelaService: JelaService, private router: Router) { }

  ngOnInit() {
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
