import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { JelaService } from 'src/app/services/jela.service';
import { Jelo } from 'src/app/shared/jelo.model';
import { ActivatedRoute } from '@angular/router';
import { KorpaService } from 'src/app/services/korpa.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jelo',
  templateUrl: './jelo.component.html',
  styleUrls: ['./jelo.component.css']
})
export class JeloComponent implements OnInit, AfterContentInit, OnDestroy {

  jelo: Jelo;
  jeloSub: Subscription;
  imeRestorana: string;

  constructor(public jeloService: JelaService, private korpaService: KorpaService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.jelo = this.jeloService.getIzabranoJelo();
    console.log(this.jelo);
    if (this.jelo === null) {
      let imeJela: string;
      this.route.paramMap.subscribe(paramMap => {
        imeJela = paramMap.get('jelo');
        this.imeRestorana = paramMap.get('restoran');
      });
      this.jeloSub = this.jeloService.findJeloByName(imeJela, this.imeRestorana).subscribe((jelo: Jelo) => {
        this.jelo = jelo;
        console.log(this.jelo);
      });
    }
  }

  ngAfterContentInit() {
    if (!this.imeRestorana) {
      this.imeRestorana = this.jelo.restoranName.split('_').join(' ');
    } else {
      this.imeRestorana = this.imeRestorana.split('_').join(' ');
    }
  }

  toCheckOut(jelo: Jelo) {
    this.korpaService.applyNarudzbinu(jelo);
  }

  ngOnDestroy() {
    if (this.jeloSub) {
      this.jeloSub.unsubscribe();
    }
  }
}
