import { Component, OnInit, Input } from '@angular/core';
import { Jelo } from 'src/app/shared/jelo.model';
import { KorpaService } from 'src/app/services/korpa.service';
import { JelaService } from 'src/app/services/jela.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-overlay',
  templateUrl: './food-overlay.component.html',
  styleUrls: ['./food-overlay.component.css']
})
export class FoodOverlayComponent implements OnInit {

  @Input() open: boolean;
  @Input() jelo: Jelo;
  @Input() hoverOver: string;

  constructor(private korpa: KorpaService, private jelaService: JelaService, private router: Router) { }

  ngOnInit() {
  }

  onJeloClick() {
    this.jelaService.setIzabranoJelo(this.jelo);
    console.log('/restorani', this.jelo.restoranName, this.jelo.name);
    this.router.navigate(['/restorani', this.jelo.restoranName, this.jelo.name]);
  }

  onKupi() {
    this.korpa.applyNarudzbinu(this.jelo);
  }

}
