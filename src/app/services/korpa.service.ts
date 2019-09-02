import { Injectable } from '@angular/core';
import { Jelo } from '../shared/jelo.model';
import { Subject, Observable } from 'rxjs';
import { Order } from '../shared/order.model';

export interface Narudzbina {
  items: Jelo[];
  amount: number[];
}

@Injectable({
  providedIn: 'root'
})
export class KorpaService {

  // private narudzbineChanged = new Subject<Jelo[]>();
  private narudzbine: Jelo[] = [];

  // private narudzbinaChanged = new Subject<Narudzbina>();
  // private narudzbina: Narudzbina = {items: [], amount: []};

  private ordersChanged = new Subject<Order[]>();
  private orders: Order[] = [];
  /*items: Jelo[] = [];
  amount: number[] = [];*/

  constructor() { }

  /*public getNarudzbineObs(): Observable<Jelo[]> {
    return this.narudzbineChanged.asObservable();
  }*/

  /*public getNarudzbinaObs(): Observable<Narudzbina> {
    return this.narudzbinaChanged.asObservable();
  }*/

  /*public getNarudzbina(): Narudzbina {
  this.countOrders();
  return this.narudzbina;
}*/

  public getOrdersObs(): Observable<Order[]> {
    return this.ordersChanged.asObservable();
  }

  public getNarudzbine(): Jelo[] {
    this.countOrders();
    return this.narudzbine;
  }

  public getOrders(): Order[] {
    this.countOrders();
    return this.orders;
  }

  public applyNarudzbinu(jelo: Jelo) {
    this.narudzbine.push(jelo);
    this.prijaviPromene();
  }

  public deleteOneNarudzbinu(jeloName: string, index: number) {
    const jeloIndex = this.narudzbine.findIndex(el => el.name === jeloName);
    this.narudzbine.splice(jeloIndex, 1);
    this.prijaviPromene();
  }

  public deleteNarudzbinu(index: number) {
    this.orders.splice(index, 1);
    this.prijaviPromene();
  }

  public clear() {
    this.narudzbine = [];
    this.prijaviPromene();
  }

  private prijaviPromene() {
    // this.narudzbineChanged.next(this.narudzbine);
    // this.narudzbinaChanged.next(this.narudzbina);
    this.countOrders();
    this.ordersChanged.next(this.orders);
  }

  public countOrders() {
    this.orders = [];
    const items: Jelo[] = [];
    const amount: number[] = [];
    const arr = this.narudzbine;
    arr.forEach(el => {
      let occurance = 0;
      arr.forEach(el2 => {
        if (el2.name === el.name) {
          occurance++;
        }
      });
      let occurance2 = 0;
      items.forEach(el3 => {
        if (items.length > 0 && occurance2 === 0) {
          if (el3.name === el.name) {
            occurance2++;
          }
        }
      });
      if (occurance2 === 0) {
        items.push(el);
        amount.push(occurance);
      }
    });
    items.forEach((el, index) => {
      const occurance = amount[index];
      const order = new Order(el, occurance);
      this.orders.push(order);
    });
    /*this.items = items;
    this.amount = amount;*/
    /*this.narudzbina.amount = amount;
    this.narudzbina.items = items;*/
  }

}
