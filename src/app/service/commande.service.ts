import { EventEmitter, Injectable, Output } from '@angular/core';
import { Support } from '../models/Support';
import { Commande } from '../models/Commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  @Output() majHistorique = new EventEmitter<any>(); // Émetteur d'événement pour notifier les changements dans l'historique des commandes
  historique: any = []; // Historique des commandes
  idCommande: string = ""; // Identifiant de la commande actuelle
  etat: boolean = false; // État de la commande (en cours ou terminée)

  constructor() { 
    // Initialise l'historique des commandes en récupérant les données depuis le stockage local
    this.historique = JSON.parse(localStorage.getItem("commande") ?? "[]");
    // Génère un nouvel identifiant de commande
    this.idCommande = this.nCommande();
  }

  // Méthode pour ajouter une commande à l'historique
  addHistorique(etat: boolean, support: Array<Support>, total: number) {
    // Crée une nouvelle commande
    let commande = new Commande(this.idCommande, etat, support, total);
    // Ajoute la commande à l'historique
    this.historique.push(commande);
    // Met à jour les données dans le stockage local
    localStorage.setItem("commande", JSON.stringify(this.historique));
    // Génère un nouvel identifiant de commande pour la prochaine commande
    this.idCommande = this.nCommande();
  }

  // Méthode pour obtenir l'historique des commandes
  getHistorique() {
    return this.historique;
  }

  // Méthode pour obtenir l'identifiant de la commande actuelle
  getId() {
    return this.idCommande;
  }

  // Méthode pour annuler l'historique des commandes
  cancel() {
    // Réinitialise l'historique des commandes
    this.historique = [];
    // Supprime les données de l'historique des commandes du stockage local
    localStorage.removeItem("commande");
    // Émet un événement pour notifier les composants de la modification de l'historique des commandes
    this.majHistorique.emit();
  }

  // Méthode pour supprimer une ligne de commande de l'historique
  deleteLigne(id: string) {
    let nouveauHistorique: Array<Support> = [];
    for (let elt of this.historique) {
      if (elt.idCommande != id) {
        nouveauHistorique.push(elt);
      }
    }
    // Met à jour l'historique des commandes dans le stockage local
    this.historique = nouveauHistorique;
    localStorage.setItem("commande", JSON.stringify(this.historique));
  }

  // Méthode pour générer un nouvel identifiant de commande
  nCommande() {
    let num: string = "";
    for (let i = 0; i < 7; i++) {
      // Génère un chiffre aléatoire entre 0 et 9
      let random = Math.floor(Math.random() * (9 - 0 + 1)) + 1;
      // Convertit le chiffre en chaîne de caractères et l'ajoute à l'identifiant de commande
      num += random.toString();
    }
    console.log(num); // Affiche l'identifiant de commande dans la console (facultatif)
    return num;
  }
}
