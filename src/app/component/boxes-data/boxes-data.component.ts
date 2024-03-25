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
  boxes: any = []
  panier: Array<Support> = []
  historique: any = []
  numCommande: string = ""


  constructor(private lookupBoxService: LookupBoxesService, private getPanier: AddPanierService, private commandeService: CommandeService) { 
    this.numCommande = this.commandeService.getId()
  }

  ngOnInit(): void {
    this.lookupBoxService.getBoxes().subscribe((res: any) => {
      this.boxes = res;

    })
    this.panier = this.getPanier.getPanier()
    this.getPanier.majPanier.subscribe((result: undefined) => {
      this.panier = this.getPanier.getPanier()
    })
  }
  getAddPanier() {
    return this.getPanier
  }

  getQuantite(id: number): number {
    for (let elt of this.panier) {
      if (elt.box.id == id) {
        return elt.quantite
      }
    }
    return 0
  }

  getBoxById(id: number) {
    for (let elt of this.boxes) {
      if (elt.id == id) {
        return elt
      }
    }
  }

  add(box: Box) {
    this.getPanier.addPanier(box, 1)
  }

  deleteBox(id: number) {
    this.getPanier.deleteBox(id)
    this.panier = this.getPanier.getPanier()
  }

  moins(id: number): void {
    for (let box of this.panier) {
      if (box.box.id == id && box.quantite > 1) {
        box.quantite--
        localStorage.setItem("panier", JSON.stringify(this.panier))
      }
    }
  }


  //panier

  addHistorique() {
    this.commandeService.addHistorique( true, this.panier, this.getTotal())
  }

  panierValide() {
    if(this.panier.length == 0) {
      return false
    }
    return true
  }

  nCommande() {
    let num: string = ""
    for (let i = 0; i < 7; i++) {
      let random = Math.floor(Math.random() * (9 - 0 + 1)) + 1;
      random.toString
      num += random
    }
    return num
  }



  getTotalLigne(id: number): number {
    return this.getPanier.getTotalOnlyBox(id)
  }

  getTotal(): number {
    return this.getPanier.getTotal()
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
      if (box.box.id == id && box.quantite > 1) {
        box.quantite--
        localStorage.setItem("panier", JSON.stringify(this.panier))
      }
    }
  }

  cancel() {
    this.getPanier.cancel()

  }

  getNumCommande() {
    console.log("getNumCommande"+this.numCommande)
    return this.numCommande
  }


}
