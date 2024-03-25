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
  boxes: any = []
  panier: Array<Support> = []
  historique: any = []
  numCommande: string = ""

  constructor(private lookupBoxesService: LookupBoxesService, private getPanier: AddPanierService, private commandeService: CommandeService) { 
    this.numCommande = this.commandeService.getId()
  }

  ngOnInit(): void {
    this.lookupBoxesService.getBoxes().subscribe((res: any) => {
      this.boxes = res;

    })
    this.panier = this.getPanier.getPanier()
    this.getPanier.majPanier.subscribe((result:undefined)=>{
      this.panier = this.getPanier.getPanier()
    })
  }

  addHistorique() {

    this.commandeService.addHistorique(true, this.panier, this.getTotal() )
  }

  

  getNumCommande() {
    console.log("getNumCommande"+this.numCommande)
    return this.numCommande
  }

  panierValide() {
    if(this.panier.length == 0) {
      return false
    }
    return true
  }

  deleteBox(id:number) {
     this.getPanier.deleteBox(id)
     this.panier=this.getPanier.getPanier()
  }

  getTotalLigne(id: number): number {
    return this.getPanier.getTotalOnlyBox(id)
  }

  getTotal(): number {
    return this.getPanier.getTotal()
  }

  getBoxById(id: number) {
    for (let elt of this.boxes) {
      if (elt.id == id) {
        return elt
      }
    }
  }


  get() {
    return this.getPanier.getPanier()
  }

  plusInPanier(id: number): void {
    for (let box of this.panier) {
      if (box.box.id == id) {
        box.quantite++
        localStorage.setItem("panier", JSON.stringify(this.panier))
      }
    }
  }
  moinsInPanier(id: number): void {
    for (let box of this.panier) {
      if (box.box.id == id && box.quantite>1) {
        box.quantite--
        localStorage.setItem("panier", JSON.stringify(this.panier))
      }
    }
  }

  cancel() {
    this.getPanier.cancel()
  
 }



}
