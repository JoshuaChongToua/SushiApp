import { EventEmitter, Injectable, Output } from '@angular/core';
import { Box } from '../models/Box';
import { Support } from '../models/Support';


@Injectable({
  providedIn: 'root'
})
export class AddPanierService {
  panier: any = []

  @Output() majPanier = new EventEmitter<any>()
  constructor() { 

    this.panier=JSON.parse(localStorage.getItem("panier") ?? "[]")
    
  }

  addPanier(box:Box,qte:number) {
    let support= new Support(box,qte)
    for(let elt of this.panier) {
      if(elt.box.id == support.box.id) {
        elt.quantite ++
        localStorage.setItem("panier",JSON.stringify(this.panier))
        return;
      }
    }
    this.panier.push(support)
    localStorage.setItem("panier",JSON.stringify(this.panier))
  }

  getPanier(): Array<Support> {
    return this.panier
  }

  getTotalOnlyBox(id:number): number {
    let ligne=this.panier.find(function(uneLigne:Support){return uneLigne.box.id==id})

    return ligne.quantite *ligne.box.prix
  }

  getTotal(): number {
    let total = 0
    for(let elt of this.panier) {
      total += this.getTotalOnlyBox(elt.box.id)
    }

    return total
  }

  deleteBox(id:number) {
    let nouveauPanier:Array<Support>=[]
    for(let elt of this.panier) {
      if (elt.box.id != id) {
        nouveauPanier.push(elt)
      }
    }
    this.panier = nouveauPanier
    localStorage.setItem("panier",JSON.stringify(this.panier))
    
  }

  cancel() {
    this.panier = []
    localStorage.removeItem("panier")
    this.majPanier.emit()
  }



}
