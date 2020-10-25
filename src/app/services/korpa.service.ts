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

  private orders: Jelo[] = [];
  private listOfOrders: Array<Jelo[]>;

  private ordersChanged = new Subject<Array<Jelo[]>>();

  constructor() { }

  public getOrdersObs(): Observable<Array<Jelo[]>> {
    return this.ordersChanged.asObservable();
  }

  public getOrders(): Array<Jelo[]> {
    this.countOrders();
    return this.listOfOrders;
  }

  public applyNarudzbinu(jelo: Jelo) {
    this.orders.push(jelo);
    this.prijaviPromene();
  }

  public deleteOneNarudzbinu(jeloName: string) {
    const orders = this.listOfOrders;
    this.listOfOrders.forEach(array => {
      if (array[0].name === jeloName) {
        const i = this.listOfOrders.indexOf(array);
        orders[i].length > 1 ?
        orders[i].pop() : orders.splice(i, 1);
      }
    });
    this.listOfOrders = orders;
    this.prijaviObrisano();
  }

  public deleteNarudzbinu(jeloName: string) {
    const orders = this.listOfOrders;
    this.listOfOrders.forEach(array => {
      if (array[0].name === jeloName) {
        orders.splice(this.listOfOrders.indexOf(array), 1);
      }
    });
    this.listOfOrders = orders;
    this.prijaviObrisano();
  }

  public clear() {
    this.orders = [];
    this.prijaviPromene();
  }

  private prijaviPromene() {
    this.countOrders();
    this.ordersChanged.next(this.listOfOrders);
  }

  private prijaviObrisano() {
    const orders = [];
    this.listOfOrders.forEach(array => {
      array.forEach(el => {
        orders.push(el);
      });
    });
    this.orders = orders;
    this.ordersChanged.next(this.listOfOrders);
  }

  public countOrders() {

    const groups = [...new Set(this.orders.map(x => x.name))];
    const groupedItems: Array<Jelo[]> = [];

    groups.forEach(el => {
      const singleGroup: Jelo[] = [];
      this.orders.forEach(el2 => {
        if (el === el2.name) {
          singleGroup.push(el2);
        }
      });
      groupedItems.push(singleGroup);
    });

    this.listOfOrders = groupedItems;
  }

}
