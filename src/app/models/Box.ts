import { IBox } from "./IBox"; 
export class Box implements IBox {
constructor(
public id: number,
public pieces: number,
public nom: string,
public image: string,
public prix: number,
public saveurs: Array<string>,
public aliments: Array<Iterable<string>>,
) {
// rien à faire de plus ici
}
}