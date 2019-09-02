import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorpaService, Narudzbina } from '../services/korpa.service';
import { pipe } from 'rxjs';
import { Jelo } from '../shared/jelo.model';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  username = 'Uloguj se';
  numOfOrders = 0;

  constructor(private router: Router, private korpaService: KorpaService) { }

  ngOnInit() {
    // this.numOfOrders = this.korpaService.getNarudzbine().length;
    this.korpaService.getOrdersObs().subscribe((orders: Order[]) => {
      let numOfOrders = 0;
      orders.forEach((el: Order) => {
        numOfOrders += el.amount;
      });
      this.numOfOrders = numOfOrders;
    });
  }

}
