import { Component, OnInit } from '@angular/core';
import { LookupBoxesService } from '../../service/lookup-boxes.service';
import { AddPanierService } from '../../service/add-panier.service';
import { Box } from '../../models/Box';
import { Support } from '../../models/Support';
import { CommandeService } from '../../service/commande.service';

@Component({
  selector: 'app-boxes-data',
  templateUrl: './boxes-data.component.html',
  styleUrl: './boxes-data.component.css'
})
export class BoxesDataComponent implements OnInit {
  boxes: any = [];
  panier: Array<Support> = [];
  historique: any = [];
  numCommande: string = "";

  constructor(private lookupBoxService: LookupBoxesService, private getPanier: AddPanierService, private commandeService: CommandeService) { 
    // Initialise le numéro de commande en utilisant le service CommandeService
    this.numCommande = this.commandeService.getId();
  }

  ngOnInit(): void {
    // Récupère les boîtes à partir du service LookupBoxesService lors de l'initialisation du composant
    this.lookupBoxService.getBoxes().subscribe((res: any) => {
      this.boxes = res;
    });

    // Initialise le panier en utilisant le service AddPanierService
    this.panier = this.getPanier.getPanier();

    // Souscrit aux changements du panier pour mettre à jour le panier actuel
    this.getPanier.majPanier.subscribe((result: undefined) => {
      this.panier = this.getPanier.getPanier();
    });
  }

  // Retourne le service AddPanierService
  getAddPanier() {
    return this.getPanier;
  }

  // Retourne la quantité d'une boîte donnée dans le panier
  getQuantite(id: number): number {
    for (let elt of this.panier) {
      if (elt.box.id == id) {
        return elt.quantite;
      }
    }
    return 0;
  }

  // Retourne la boîte correspondant à un identifiant donné
  getBoxById(id: number) {
    for (let elt of this.boxes) {
      if (elt.id == id) {
        return elt;
      }
    }
  }

  // Ajoute une boîte au panier
  add(box: Box) {
    this.getPanier.addPanier(box, 1);
  }

  // Supprime une boîte du panier
  deleteBox(id: number) {
    this.getPanier.deleteBox(id);
    this.panier = this.getPanier.getPanier();
  }

  // Diminue la quantité d'une boîte donnée dans le panier
  moins(id: number): void {
    for (let box of this.panier) {
      if (box.box.id == id && box.quantite > 1) {
        box.quantite--;
        localStorage.setItem("panier", JSON.stringify(this.panier));
      }
    }
  }

  // Ajoute le panier à l'historique des commandes
  addHistorique() {
    this.commandeService.addHistorique(true, this.panier, this.getTotal());
  }

  // Vérifie si le panier est vide
  panierValide() {
    if(this.panier.length == 0) {
      return false;
    }
    return true;
  }

  // Génère un numéro de commande aléatoire
  nCommande() {
    let num: string = "";
    for (let i = 0; i < 7; i++) {
      let random = Math.floor(Math.random() * (9 - 0 + 1)) + 1;
      random.toString();
      num += random;
    }
    return num;
  }

  // Retourne le total pour une ligne spécifique dans le panier
  getTotalLigne(id: number): number {
    return this.getPanier.getTotalOnlyBox(id);
  }

  // Retourne le total du panier
  getTotal(): number {
    return this.getPanier.getTotal();
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

  // Retourne le numéro de commande
  getNumCommande() {
    console.log("getNumCommande" + this.numCommande);
    return this.numCommande;
  }
}
