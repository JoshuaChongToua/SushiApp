import { Component } from '@angular/core';
import { Box } from '../../models/Box';
import { LookupBoxesService } from '../../service/lookup-boxes.service';
import { AddPanierService } from '../../service/add-panier.service';
import { Support } from '../../models/Support';
import { Commande } from '../../models/Commande';
import { CommandeService } from '../../service/commande.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  boxes: any = []; // Liste des boîtes disponibles
  panier: Array<Support> = []; // Panier contenant les boîtes sélectionnées
  historique: any = []; // Historique des commandes
  numCommande: string = ""; // Numéro de commande actuel

  constructor(private lookupBoxesService: LookupBoxesService, private getPanier: AddPanierService, private commandeService: CommandeService) { 
    // Initialise le numéro de commande en utilisant le service CommandeService
    this.numCommande = this.commandeService.getId();
  }

  ngOnInit(): void {
    // Récupère les boîtes disponibles en utilisant le service LookupBoxesService
    this.lookupBoxesService.getBoxes().subscribe((res: any) => {
      this.boxes = res;
    });

    // Initialise le panier en utilisant le service AddPanierService
    this.panier = this.getPanier.getPanier();

    // Souscrit aux changements du panier pour mettre à jour le panier actuel
    this.getPanier.majPanier.subscribe((result: undefined) => {
      this.panier = this.getPanier.getPanier();
    });
  }

  // Ajoute l'historique de commande
  addHistorique() {
    if(this.getTotal() < 30) {
      this.commandeService.addHistorique(true, this.panier, this.getTotal());
    }
    else {
      this.commandeService.addHistorique(true, this.panier, this.getTotalReduit());
    }
  }

  // Retourne le numéro de commande
  getNumCommande() {
    console.log("getNumCommande" + this.numCommande);
    return this.numCommande;
  }

  // Vérifie si le panier est valide (s'il contient des éléments)
  panierValide() {
    if(this.panier.length == 0) {
      return false;
    }
    return true;
  }

  // Supprime une boîte du panier
  deleteBox(id:number) {
    this.getPanier.deleteBox(id);
    this.panier = this.getPanier.getPanier();
  }

  // Retourne le total pour une ligne spécifique dans le panier
  getTotalLigne(id: number): number {
    return this.getPanier.getTotalOnlyBox(id);
  }

  // Retourne le total du panier
  getTotal(): number {
    return this.getPanier.getTotal();
  }

  // Retourne la boîte correspondant à un identifiant donné
  getBoxById(id: number) {
    for (let elt of this.boxes) {
      if (elt.id == id) {
        return elt;
      }
    }
  }

  // Retourne le panier actuel
  get() {
    return this.getPanier.getPanier();
  }

  // Augmente la quantité d'une boîte donnée dans le panier
  plusInPanier(id: number): void {
    for (let box of this.panier) {
      if (box.box.id == id) {
        box.quantite++;
        localStorage.setItem("panier", JSON.stringify(this.panier));
      }
    }
  }

  // Diminue la quantité d'une boîte donnée dans le panier
  moinsInPanier(id: number): void {
    for (let box of this.panier) {
      if (box.box.id == id && box.quantite > 1) {
        box.quantite--;
        localStorage.setItem("panier", JSON.stringify(this.panier));
      }
    }
  }

  // Annule le panier
  cancel() {
    this.getPanier.cancel();
  }

  offre() {
    return this.getPanier.minimum()
  }

  getTotalReduit() {
    return this.getPanier.getTotalReduit()
  }

  getSaveurs() {
    return this.getPanier.nbrSaveurs()
  }

  hazard() {
    return this.getPanier.hazard()
  }

}
