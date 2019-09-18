import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorpaService } from '../services/korpa.service';
import { Jelo } from '../shared/jelo.model';
import { AuthService } from '../services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  username = 'Uloguj se';
  numOfOrders = 0;
  isLoged = false;
  open = false;

  constructor(private router: Router, private korpaService: KorpaService, private auth: AuthService) { }

  ngOnInit() {
    this.isLoged = this.auth.isLoged;
    this.auth.userSubject.subscribe(user => {
      this.username = user.username;
      this.isLoged = this.auth.isLoged;
    });
    this.korpaService.getOrdersObs().subscribe((orders: Array<Jelo[]>) => {
      let numOfOrders = 0;
      orders.forEach(array => {
        numOfOrders += array.length;
      });
      this.numOfOrders = numOfOrders;
    });
  }

  toggleDrop() {
    this.open = !this.open;
  }

  closeDrop() {
    this.open = false;
  }

}
