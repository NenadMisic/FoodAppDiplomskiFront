import { Jelo } from './jelo.model';

export class Order {
    constructor(
        public item: Jelo, public amount: number
    ) {}
}