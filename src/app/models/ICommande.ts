import { Support } from "./Support";

export interface ICommande {
    idCommande: string,
    etat: boolean,
    support : Array<Support>,
    total: number
    
} 