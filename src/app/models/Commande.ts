import { ICommande } from "./ICommande";
import { Support } from "./Support";
export class Commande implements ICommande {
    constructor(
        public idCommande : string,
        public etat: boolean ,
        public support: Array<Support>,
        public total: number
    ) {
        // rien à faire de plus ici
    }
}