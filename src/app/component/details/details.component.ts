import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupBoxesService } from '../../service/lookup-boxes.service';
import { Box } from '../../models/Box';
import { AddPanierService } from '../../service/add-panier.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  idBox: any;
  boxData: any; // Contiendra les données de la boîte sélectionnée
  listBoxes: any = []; // Contiendra toutes les boîtes disponibles

  constructor(private route: ActivatedRoute, private lookupBoxService: LookupBoxesService, private addPanier: AddPanierService) {}

  ngOnInit(): void {
    // Souscrit aux paramètres de l'URL pour récupérer l'identifiant de la boîte
    this.route.params.subscribe(params => {
      this.idBox = params['id']; 
    });
    // Récupère toutes les boîtes disponibles
    this.lookupBoxService.getBoxes().subscribe((res: any) => {
      this.listBoxes = res;
      // Appelle la méthode getData une fois que les données sont récupérées
      this.getData();
    });
  }

  // Méthode pour extraire les données de la boîte sélectionnée
  getData() {
    // Utilise la méthode find() pour trouver la boîte avec l'identifiant correspondant
    this.boxData = this.listBoxes.find((uneBox: Box) => uneBox.id == this.idBox);
    // Cette méthode permet d'obtenir les données de la boîte sélectionnée
  }

  // Méthode pour ajouter la boîte sélectionnée au panier
  add() {
    this.addPanier.addPanier(this.boxData, 1);
    // Cette méthode appelle la fonction addPanier du service AddPanierService pour ajouter la boîte sélectionnée au panier
  }
}
