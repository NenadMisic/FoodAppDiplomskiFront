import { Component, OnInit, OnDestroy } from '@angular/core';
import { Restoran } from '../shared/restoran.model';
import { RestoraniService } from '../services/restorani.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-restorani',
  templateUrl: './restorani.component.html',
  styleUrls: ['./restorani.component.css']
})
export class RestoraniComponent implements OnInit, OnDestroy {

  restarauntAddForm: FormGroup;
  restarauntEditForm: FormGroup;
  restorani: Restoran[] = [];
  restoraniSub: Subscription;
  restoranToEdit: Restoran;

  isAdmin = false;
  addingRestoran = false;
  editingRestoran = false;

  constructor(private restoranService: RestoraniService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.auth.user.admin;
    this.auth.userSubject.subscribe(user => {
      this.isAdmin = user.admin;
    });
    this.getRestorani();
  }

  getRestorani() {
    if (this.restoraniSub) {
      this.restoraniSub.unsubscribe();
    }
    this.restoraniSub = this.restoranService.getRestoraniDB().subscribe(restorani => {
      this.restorani = restorani;
    });
  }

  goToRestoran(restoran: Restoran) {
    this.restoranService.setActiveRestoran(restoran);
    this.router.navigate(['/restorani', restoran.name.replace(/\s/g, '_')]);
  }

  addRes() {
    if (this.editingRestoran) {
      this.editingRestoran = false;
    }
    this.restarauntAddForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      url: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
    this.addingRestoran = true;
  }

  sendAddReq() {
    if (this.addingRestoran) {
      const restoran: Restoran = new Restoran(
        this.restarauntAddForm.get('name').value,
        this.restarauntAddForm.get('description').value,
        this.restarauntAddForm.get('address').value,
        this.restarauntAddForm.get('url').value,
        this.restarauntAddForm.get('phone').value,
      );
      this.restoranService.addRestoran(restoran).subscribe(() => {
        this.getRestorani();
      });
    }
  }

  editRestoran(restoran: Restoran) {
    if (this.addingRestoran) {
      this.addingRestoran = false;
    }
    this.restoranToEdit = restoran;
    this.restarauntEditForm = new FormGroup({
      newName: new FormControl(null, [Validators.required]),
      newDescription: new FormControl(null, [Validators.required]),
      newAddress: new FormControl(null, [Validators.required]),
      newUrl: new FormControl(null, [Validators.required]),
      newPhone: new FormControl(null, [Validators.required])
    });
    this.editingRestoran = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  sendEditReq() {
    if (this.editingRestoran) {
      const restoran: Restoran = new Restoran(
        this.restarauntEditForm.get('newName').value,
        this.restarauntEditForm.get('newDescription').value,
        this.restarauntEditForm.get('newAddress').value,
        this.restarauntEditForm.get('newUrl').value,
        this.restarauntEditForm.get('newPhone').value,
      );
      this.restoranService.editRestoran(restoran, this.restoranToEdit.name).subscribe(() => {
        this.getRestorani();
      });
    }
  }

  cancelAdd() {
    this.restarauntAddForm.reset();
    this.addingRestoran = false;
  }

  cancelEdit() {
    this.restarauntEditForm.reset();
    this.editingRestoran = false;
  }

  deleteRestoranStart(restoranName: string) {
    if (window.confirm(`Da li zelite da obrisete restoran: ${restoranName}?`)) {
      this.restoranService.deleteRestoran(restoranName).subscribe(() => {
        this.getRestorani();
      });
    }
  }

  ngOnDestroy() {
    if (this.restoraniSub) {
      this.restoraniSub.unsubscribe();
    }
  }

}
