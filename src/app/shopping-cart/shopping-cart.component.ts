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
export class ShoppingCartComponent implements OnInit, OnDestroy {

  bill: number;
  empty = true;
  orders: Array<Jelo[]> = [];
  cartItems: Jelo[] = [];
  groupLength = [];

  /*items: Jelo[] = [];
  amount: number[] = [];*/

  orderSub: Subscription;

  constructor(private korpaService: KorpaService) { }

  ngOnInit() {
    this.bill = 0;
    this.orders = this.korpaService.getOrders();
    this.updateOrder2(this.orders);
    this.orderSub = this.korpaService.getOrdersObs().subscribe((orders: Array<Jelo[]>) => {
      this.updateOrder2(orders);
    });

  }

  private updateOrder2(orders: Array<Jelo[]>) {
    if (orders.length > 0 && orders[0].length > 0) {
      this.orders = orders;
      this.cartItems = [];
      this.groupLength = [];
      this.empty = false;
      let varBill = 0;
      this.orders.forEach(array => {
        this.cartItems.push(array[0]);
        this.groupLength.push(array.length);
        varBill += array[0].price * array.length;
      });
      this.bill = varBill;
    } else {
      this.empty = true;
    }
  }

  onOrderAddOne(jelo: Jelo) {
    this.korpaService.applyNarudzbinu(jelo);
  }

  onOrderRemoveOne(jeloName: string) {
    this.korpaService.deleteOneNarudzbinu(jeloName);
  }


  onOrderRemove(jeloName: string) {
    this.korpaService.deleteNarudzbinu(jeloName);
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

  onClear() {
    this.korpaService.clear();
  }

  proceedPayment() {
    console.log('Vas racun je: ', this.bill);
  }

}
