import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestoraniService } from 'src/app/services/restorani.service';
import { Restoran } from 'src/app/shared/restoran.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Jelo } from 'src/app/shared/jelo.model';
import { JelaService } from 'src/app/services/jela.service';
import { KorpaService } from 'src/app/services/korpa.service';
import { Subscription } from 'rxjs';
import { RestoranJelovnik } from 'src/app/shared/restoranJelovnik.model';

@Component({
  selector: 'app-restoran',
  templateUrl: './restoran.component.html',
  styleUrls: ['./restoran.component.css']
})
export class RestoranComponent implements OnInit, OnDestroy {

  restoranSub: Subscription;
  restoran: Restoran;
  jelovnikSub: Subscription;
  jelovnik: Jelo[];
  restoranLoaded = false;
  jelovnikLoaded = false;

  constructor(
    private restoranService: RestoraniService,
    private jeloService: JelaService,
    private korpaService: KorpaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('OnInit');
    this.restoran = this.restoranService.getActiveRestoran();
    if (this.restoran === null) {
      let imeRestorana: string;
      this.route.paramMap.subscribe(paramMap => {
        imeRestorana = paramMap.get('restoran');
        console.log('Izvuceno ime', imeRestorana);
      });
      this.restoranSub = this.restoranService.findRestoranByName(imeRestorana).subscribe((restoranJelovnik: RestoranJelovnik) => {
        console.log(restoranJelovnik);
        this.restoran = restoranJelovnik.restoran;
        this.jelovnik = restoranJelovnik.jelovnik;
        this.restoranLoaded = true;
        this.jelovnikLoaded = true;
      });
    } else {
      this.restoranLoaded = true;
    }
    if (this.restoranLoaded && !this.jelovnikLoaded) {
      this.jelovnikSub = this.jeloService.getJelaZaRestoran(this.restoran.name.split(' ').join('_')).subscribe(jela => {
        this.jelovnik = jela;
        this.jelovnikLoaded = true;
      });
    }
  }

  onJeloClick(jelo: Jelo) {
    this.jeloService.setIzabranoJelo(jelo);
    this.router.navigate(['/restorani', jelo.restoranName, jelo.name]);
  }

  toCheckOut(jelo: Jelo) {
    this.korpaService.applyNarudzbinu(jelo);
  }

  ngOnDestroy() {
    if (this.jelovnikSub && this.restoranSub) {
      this.jelovnikSub.unsubscribe();
      this.restoranSub.unsubscribe();
    }
  }
}
