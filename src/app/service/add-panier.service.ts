import { EventEmitter, Injectable, Output } from '@angular/core';
import { Box } from '../models/Box';
import { Support } from '../models/Support';

@Injectable({
  providedIn: 'root'
})
export class AddPanierService {
  panier: any = []; // Le panier qui contient les éléments sélectionnés

  @Output() majPanier = new EventEmitter<any>(); // Émetteur d'événement pour notifier les changements dans le panier

  constructor() { 
    // Initialise le panier en récupérant les données depuis le stockage local
    this.panier = JSON.parse(localStorage.getItem("panier") ?? "[]");
  }

  // Méthode pour ajouter un élément au panier
  addPanier(box: Box, qte: number) {
    let support = new Support(box, qte);
    // Vérifie si la boîte est déjà dans le panier, si oui, incrémente la quantité
    for (let elt of this.panier) {
      if (elt.box.id == support.box.id) {
        elt.quantite++;
        localStorage.setItem("panier", JSON.stringify(this.panier));
        return;
      }
    }
    // Si la boîte n'est pas déjà dans le panier, l'ajoute
    this.panier.push(support);
    localStorage.setItem("panier", JSON.stringify(this.panier));
  }

  // Méthode pour récupérer le panier complet
  getPanier(): Array<Support> {
    return this.panier;
  }

  // Méthode pour obtenir le total d'une ligne spécifique dans le panier
  getTotalOnlyBox(id: number): number {
    let ligne = this.panier.find(function(uneLigne: Support) { return uneLigne.box.id == id });
    return ligne.quantite * ligne.box.prix;
  }

  // Méthode pour obtenir le total de tous les éléments dans le panier
  getTotal(): number {
    let total = 0;
    let prixReduit = 0
    for (let elt of this.panier) {
      total += this.getTotalOnlyBox(elt.box.id);
    }
    
    return total;
  }

  getTotalReduit(): number {
    let total = 0;
    let prixReduit = 0
    for (let elt of this.panier) {
      total += this.getTotalOnlyBox(elt.box.id);
    }
    // if(total>=30) {
    //   prixReduit = this.minimum()
    // }
    if(total>=35) {
      prixReduit = this.hazard()
    }
    total -= prixReduit
    return total;
  }

  // Méthode pour supprimer une boîte du panier
  deleteBox(id: number) {
    let nouveauPanier: Array<Support> = [];
    for (let elt of this.panier) {
      if (elt.box.id != id) {
        nouveauPanier.push(elt);
      }
    }
    this.panier = nouveauPanier;
    localStorage.setItem("panier", JSON.stringify(this.panier));
  }

  // Méthode pour annuler le panier
  cancel() {
    this.panier = []; // Réinitialise le panier
    localStorage.removeItem("panier"); // Supprime le panier du stockage local
    this.majPanier.emit(); // Émet un événement pour notifier les composants de la modification du panier
  }

  minimum() {
    let prixMin = 999
    for(let elt of this.panier) {
      if(elt.box.prix < prixMin) {
        prixMin = elt.box.prix
      }
    }
    
    return prixMin
  }

  hazard(): number {
    let index = Math.floor(Math.random() * this.panier.length);
  
    return this.panier[index].box.prix;
  }
  

  nbrSaveurs() {
    let listSaveurs: Array<any> = []
    for(let elt of this.panier) {
      for(let saveur of elt.box.saveurs) {
        if(!listSaveurs.includes(saveur)) {
          listSaveurs.push(saveur)
        }
      }
    }
    return listSaveurs.length
  }
}
