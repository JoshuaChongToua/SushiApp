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
  historique: any = []
  idCommande: string = ""
  etat: boolean = false
  support: any
  total: any

  constructor(private lookupBoxesService: LookupBoxesService, private getPanier: AddPanierService, private commandeService: CommandeService) { 
    this.idCommande = this.commandeService.getId()
  }

  ngOnInit(): void {
    this.historique = this.commandeService.getHistorique()
    console.log(this.historique)

    this.commandeService.majHistorique.subscribe((result:undefined)=>{
      this.historique = this.commandeService.getHistorique()
    })
  }

  

  addHistorique() {
    this.commandeService.addHistorique( this.etat, this.support, this.total)
  }

  deleteLigne(id:string) {
    this.commandeService.deleteLigne(id)
    this.historique=this.commandeService.getHistorique()
 }

  deleteHistorique() {
    this.commandeService.cancel()
  }

}
