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

  private narudzbine: Jelo[] = [];

  private ordersChanged = new Subject<Array<Jelo[]>>();
  private orders: Array<Jelo[]>;

  constructor() { }

  public getOrdersObs(): Observable<Array<Jelo[]>> {
    return this.ordersChanged.asObservable();
  }

  public getOrders(): Array<Jelo[]> {
    this.countOrders();
    return this.orders;
  }

  public applyNarudzbinu(jelo: Jelo) {
    this.narudzbine.push(jelo);
    console.log('Narudzbine: ', this.narudzbine);
    this.prijaviPromene();
    console.log('DODAT 1', this.orders);
  }

  public deleteOneNarudzbinu(jeloName: string) {
    const orders = this.orders;
    this.orders.forEach(array => {
      if (array[0].name === jeloName) {
        const i = this.orders.indexOf(array);
        orders[i].pop();
      }
    });
    this.orders = orders;
    this.prijaviObrisano();
    console.log('IZBRISAN 1', this.orders);
  }

  public deleteNarudzbinu(jeloName: string) {
    const orders = this.orders;
    this.orders.forEach(array => {
      if (array[0].name === jeloName) {
        orders.splice(this.orders.indexOf(array), 1);
      }
    });
    this.orders = orders;
    this.prijaviObrisano();
    console.log('IZBRISAN RED', this.orders);
  }

  public clear() {
    this.narudzbine = [];
    this.prijaviPromene();
  }

  private prijaviPromene() {
    this.countOrders();
    this.ordersChanged.next(this.orders);
  }

  private prijaviObrisano() {
    const orders = [];
    this.orders.forEach(array => {
      array.forEach(el => {
        orders.push(el);
      });
    });
    this.narudzbine = orders;
    this.ordersChanged.next(this.orders);
  }

  public countOrders() {

    const groups = [...new Set(this.narudzbine.map(x => x.name))];
    const groupedItems: Array<Jelo[]> = [];

    console.log('Groups: ', groups);

    groups.forEach(el => {
      const singleGroup: Jelo[] = [];
      this.narudzbine.forEach(el2 => {
        if (el === el2.name) {
          singleGroup.push(el2);
        }
      });
      groupedItems.push(singleGroup);
    });

    this.orders = groupedItems;
    console.log(this.orders);
  }

}
