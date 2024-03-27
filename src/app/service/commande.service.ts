import { EventEmitter, Injectable, Output } from '@angular/core';
import { Support } from '../models/Support';
import { Commande } from '../models/Commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  @Output() majHistorique = new EventEmitter<any>()
  historique: any = []
  idCommande: string = ""
  etat: boolean = false

  constructor() { 
    this.historique=JSON.parse(localStorage.getItem("commande") ?? "[]")
    this.idCommande=this.nCommande()
  }

  addHistorique( etat: boolean, support: Array<Support>, total:number) {
    let commande = new Commande(this.idCommande, etat, support, total)
    this.historique.push(commande)
    localStorage.setItem("commande",JSON.stringify(this.historique)) 
    this.idCommande=this.nCommande()
  
  }

  getHistorique() {
    return this.historique
  }

  getId() {
    return this.idCommande
  }

  cancel() {
    this.historique = []
    localStorage.removeItem("commande")
    this.majHistorique.emit()
  }

  deleteLigne(id:string) {
    let nouveauHistorique: Array<Support>=[]
    for(let elt of this.historique) {
      if (elt.idCommande != id) {
        nouveauHistorique.push(elt)
      }
    }
    this.historique = nouveauHistorique
    localStorage.setItem("commande",JSON.stringify(this.historique))
    
  }
  nCommande() {
  
    let num: string = ""
    for(let i = 0 ; i<7 ; i++ ){
      let random =Math.floor(Math.random() * (9 - 0 + 1)) + 1;
      random.toString
      num += random
    }
    console.log(num)
    return num
  }

}
