import { Ingredient } from './ingredient.model';
import { Nutrition } from './nutrition.model';

export class Jelo {

    restoranName: string;

    constructor(
        public name: string,
        public description: string,
        public price: number,
        public imgUrl: string,
        restoranName: string,
        public ingredients: Ingredient[],
        public nutritions: Nutrition[]
    ) {
        this.restoranName = this.imeRestorana(restoranName);
    }

    private imeRestorana(restoranName: string): string {
        let novoIme: string;
        novoIme = restoranName.replace(/\s/g, '_');
        return novoIme;
    }

}
