import { Component } from '@angular/core';
import { AddPanierService } from '../../service/add-panier.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private getPanier: AddPanierService) { }
  
  // Méthode pour obtenir le total du panier
  getTotal(): number {
    return this.getPanier.getTotal();
  }

  getTotalReduit() {
    return this.getPanier.getTotalReduit()
  }

  // Méthode pour annuler le panier
  cancel() {
     this.getPanier.cancel();
  }
}
