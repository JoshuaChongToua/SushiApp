import { Box } from "./Box";
import { ISupport } from "./ISupport"; 
export class Support implements ISupport {


constructor(
public box: Box,
public quantite: number
) {

}
}