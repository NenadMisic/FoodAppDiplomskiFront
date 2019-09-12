import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorpaService, Narudzbina } from '../services/korpa.service';
import { pipe } from 'rxjs';
import { Jelo } from '../shared/jelo.model';
import { Order } from '../shared/order.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  username = 'Uloguj se';
  numOfOrders = 0;

  constructor(private router: Router, private korpaService: KorpaService, private auth: AuthService) { }

  ngOnInit() {
    // this.numOfOrders = this.korpaService.getNarudzbine().length;
    this.auth.userSubject.subscribe(user => {
      this.username = user.username;
    });
    this.korpaService.getOrdersObs().subscribe((orders: Array<Jelo[]>) => {
      let numOfOrders = 0;
      orders.forEach(array => {
        numOfOrders += array.length;
      });
      this.numOfOrders = numOfOrders;
    });
  }

}
