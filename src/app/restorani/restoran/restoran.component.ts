import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestoraniService } from 'src/app/services/restorani.service';
import { Restoran } from 'src/app/shared/restoran.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Jelo } from 'src/app/shared/jelo.model';
import { JelaService } from 'src/app/services/jela.service';
import { KorpaService } from 'src/app/services/korpa.service';
import { Subscription } from 'rxjs';
import { RestoranJelovnik } from 'src/app/shared/restoranJelovnik.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-restoran',
  templateUrl: './restoran.component.html',
  styleUrls: ['./restoran.component.css']
})
export class RestoranComponent implements OnInit, OnDestroy {

  jeloAddForm: FormGroup;
  jeloEditForm: FormGroup;
  restoranSub: Subscription;
  restoran: Restoran;
  jelovnikSub: Subscription;
  jelovnik: Jelo[];
  jeloToEdit: Jelo;
  restoranLoaded = false;
  jelovnikLoaded = false;
  isLoged: boolean;
  isAdmin = false;

  addingJelo = false;
  editingJelo = false;

  constructor(
    private restoranService: RestoraniService,
    private jeloService: JelaService,
    private korpaService: KorpaService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.auth.user.admin;
    this.auth.userSubject.subscribe(user => {
      this.isAdmin = user.admin;
    });
    console.log('OnInit');
    this.isLoged = this.auth.isLoged;
    this.auth.userSubject.subscribe(user => {
      this.isLoged = this.auth.isLoged;
    });
    this.restoran = this.restoranService.getActiveRestoran();
    if (this.restoran === null) {
      let imeRestorana: string;
      this.route.paramMap.subscribe(paramMap => {
        imeRestorana = paramMap.get('restoran');
        console.log('Izvuceno ime', imeRestorana);
      });
      this.getRestoran(imeRestorana);
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

  getRestoran(imeRestorana: string) {
    if (this.restoranSub) {
      this.restoranSub.unsubscribe();
    }
    this.restoranSub = this.restoranService.findRestoranByName(imeRestorana).subscribe((restoranJelovnik: RestoranJelovnik) => {
      console.log(restoranJelovnik);
      this.restoran = restoranJelovnik.restoran;
      this.jelovnik = restoranJelovnik.jelovnik;
      this.restoranLoaded = true;
      this.jelovnikLoaded = true;
    });
  }

  onJeloClick(jelo: Jelo) {
    this.jeloService.setIzabranoJelo(jelo);
    this.router.navigate(['/restorani', jelo.restoranName, jelo.name]);
  }

  toCheckOut(jelo: Jelo) {
    this.korpaService.applyNarudzbinu(jelo);
  }

  addJelo() {
    if (this.editingJelo) {
      this.editingJelo = false;
    }
    this.jeloAddForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      url: new FormControl(null, [Validators.required])
    });
    this.addingJelo = true;
  }

  sendAddReq() {
    if (this.addingJelo) {
      const jelo: Jelo = new Jelo(
        this.jeloAddForm.get('name').value,
        this.jeloAddForm.get('description').value,
        this.jeloAddForm.get('price').value,
        this.jeloAddForm.get('url').value,
        this.restoran.name,
        [], []
      );
      this.jeloService.addJelo(this.restoran.name, jelo).subscribe(() => {
        this.getRestoran(this.restoran.name);
      });
    }
  }

  cancelAdd() {
    this.jeloAddForm.reset();
    this.addingJelo = false;
  }

  editJelo(jelo: Jelo) {
    if (this.addingJelo) {
      this.addingJelo = false;
    }
    this.jeloToEdit = jelo;
    this.jeloEditForm = new FormGroup({
      newName: new FormControl(null, [Validators.required]),
      newDescription: new FormControl(null, [Validators.required]),
      newUrl: new FormControl(null, [Validators.required]),
      newPrice: new FormControl(null, [Validators.required])
    });
    this.editingJelo = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  sendEditReq() {
    if (this.editingJelo) {
      const jelo: Jelo = new Jelo(
        this.jeloEditForm.get('newName').value,
        this.jeloEditForm.get('newDescription').value,
        this.jeloEditForm.get('newPrice').value,
        this.jeloEditForm.get('newUrl').value,
        this.restoran.name, [], []
      );
      this.jeloService.editJelo(this.restoran.name, jelo).subscribe(() => {
        this.getRestoran(this.restoran.name);
      });
    }
  }

  cancelEdit() {
    this.jeloEditForm.reset();
    this.editingJelo = false;
  }

  deleteJeloStart(jeloName: string) {
    if (window.confirm(`Da li zelite da obrisete jelo: ${jeloName}?`)) {
      this.jeloService.deleteJelo(this.restoran.name, jeloName).subscribe(() => {
        this.getRestoran(this.restoran.name);
      });
    }
  }

  ngOnDestroy() {
    if (this.jelovnikSub) {
      this.jelovnikSub.unsubscribe();
    }
    if (this.restoranSub) {
      this.restoranSub.unsubscribe();
    }
  }

}
