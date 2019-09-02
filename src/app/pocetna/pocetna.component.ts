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

  constructor(private jelaService: JelaService, private router: Router) { }

  ngOnInit() {
    this.hranaSub = this.jelaService.getNajpopularnijeDB().subscribe(hrana => {
      this.hrana = hrana;
    });
  }

  openModal(e: MouseEvent) {
    const xPos = e.clientX;
    const yPos = e.clientY;
    console.log(e);
    console.log(xPos, yPos);
  }

  onJeloClick(jelo: Jelo) {
    this.jelaService.setIzabranoJelo(jelo);
    console.log('/restorani', jelo.restoranName, jelo.name);
    this.router.navigate(['/restorani', jelo.restoranName, jelo.name]);
  }

  ngOnDestroy() {
    if (this.hranaSub) {
      this.hranaSub.unsubscribe();
    }
  }

}
