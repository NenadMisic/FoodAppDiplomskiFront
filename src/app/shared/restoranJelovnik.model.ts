import { Restoran } from './restoran.model';
import { Jelo } from './jelo.model';

export class RestoranJelovnik {

    constructor(public restoran: Restoran, public jelovnik: Jelo[]) {}

}
