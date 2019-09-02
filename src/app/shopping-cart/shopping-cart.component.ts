import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { KorpaService, Narudzbina } from '../services/korpa.service';
import { Subscription } from 'rxjs';
import { Jelo } from '../shared/jelo.model';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy, AfterViewInit {

  bill: number;
  empty = true;
  orders: Order[] = [];

  /*items: Jelo[] = [];
  amount: number[] = [];*/

  orderSub: Subscription;

  constructor(private korpaService: KorpaService) { }

  ngOnInit() {
    this.bill = 0;
    this.orders = this.korpaService.getOrders();
    this.updateOrder2(this.orders);
    this.orderSub = this.korpaService.getOrdersObs().subscribe((orders: Order[]) => {
      this.updateOrder2(orders);
    });
    /*const naruzbina = this.korpaService.getNarudzbina();
    this.items = naruzbina.items;
    this.amount = naruzbina.amount;
    this.updateOrder(this.items);
    this.orderSub = this.korpaService.getNarudzbinaObs().subscribe((extractedOrders: Narudzbina) => {
      this.items = extractedOrders.items;
      this.amount = extractedOrders.amount;
      this.updateOrder(this.items);
    });*/

  }

  ngAfterViewInit() {
    // this.countOrders();
  }

  /*private updateOrder(jela: Jelo[]) {
    if (jela.length > 0) {
      this.empty = false;
      let varBill = 0;
      this.items.forEach((order: Jelo, index) => {
        varBill += order.price * this.amount[index];
      });
      this.bill = varBill;
    } else {
      this.empty = true;
    }
  }*/

  private updateOrder2(orders: Order[]) {
    if (orders.length > 0) {
      this.empty = false;
      let varBill = 0;
      this.orders.forEach((order: Order) => {
        varBill += order.item.price * order.amount;
      });
      this.bill = varBill;
    } else {
      this.empty = true;
    }
  }

  onOrderRemove(index: number) {
    this.korpaService.deleteNarudzbinu(index);
  }

  onOrderAddOne(index: number) {
    this.korpaService.applyNarudzbinu(this.orders[index].item);
  }

  onOrderRemoveOne(index: number) {
    this.korpaService.deleteOneNarudzbinu(this.orders[index].item.name, index);
  }

  ngOnDestroy() {
    console.log('Korpa OnDestroy');
    this.orderSub.unsubscribe();
  }

  onClear() {
    this.korpaService.clear();
  }

  proceedPayment() {
    console.log('Vas racun je: ', this.bill);
  }

}
