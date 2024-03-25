import { Component, EventEmitter, Output } from '@angular/core';
import { AddPanierService } from '../../service/add-panier.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor( private getPanier: AddPanierService) { }
  


  getTotal(): number {
    return this.getPanier.getTotal()
  }

  cancel() {
     this.getPanier.cancel()
   
  }
}
