import { Component, OnInit, OnDestroy } from '@angular/core';
import { Restoran } from '../shared/restoran.model';
import { RestoraniService } from '../services/restorani.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restorani',
  templateUrl: './restorani.component.html',
  styleUrls: ['./restorani.component.css']
})
export class RestoraniComponent implements OnInit, OnDestroy {

  restorani: Restoran[] = [];
  restoraniSub: Subscription;

  constructor(private restoranService: RestoraniService, private router: Router) { }

  ngOnInit() {
    this.restoraniSub = this.restoranService.getRestoraniDB().subscribe(restorani => {
      this.restorani = restorani;
    });
  }

  goToRestoran(restoran: Restoran) {
    this.restoranService.setActiveRestoran(restoran);
    this.router.navigate(['/restorani', restoran.name.replace(/\s/g, '_')]);
  }

  ngOnDestroy() {
    if (this.restoraniSub) {
      this.restoraniSub.unsubscribe();
    }
  }

}
