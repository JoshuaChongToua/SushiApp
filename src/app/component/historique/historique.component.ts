import { Component, OnInit } from '@angular/core';
import { AddPanierService } from '../../service/add-panier.service';
import { LookupBoxesService } from '../../service/lookup-boxes.service';
import { Commande } from '../../models/Commande';
import { CommandeService } from '../../service/commande.service';
import { Support } from '../../models/Support';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {
  historique: any = []; // Tableau contenant l'historique des commandes
  idCommande: string = ""; // ID de la commande actuelle
  etat: boolean = false; // État de la commande (en cours ou terminée)
  support: any; // Support de la commande (liste de boîtes)
  total: any; // Total de la commande

  constructor(private lookupBoxesService: LookupBoxesService, private getPanier: AddPanierService, private commandeService: CommandeService) { 
    // Initialise l'ID de la commande en utilisant le service CommandeService
    this.idCommande = this.commandeService.getId();
  }

  ngOnInit(): void {
    // Initialise l'historique des commandes en récupérant les données du service CommandeService
    this.historique = this.commandeService.getHistorique();
    
    // Souscrit aux changements de l'historique des commandes pour mettre à jour les données
    this.commandeService.majHistorique.subscribe((result: undefined) => {
      this.historique = this.commandeService.getHistorique();
    });
  }

  // Ajoute une commande à l'historique
  addHistorique() {
    this.commandeService.addHistorique(this.etat, this.support, this.total);
  }

  // Supprime une ligne de commande de l'historique
  deleteLigne(id: string) {
    this.commandeService.deleteLigne(id);
    this.historique = this.commandeService.getHistorique();
  }

  // Supprime l'historique complet des commandes
  deleteHistorique() {
    this.commandeService.cancel();
  }
}
