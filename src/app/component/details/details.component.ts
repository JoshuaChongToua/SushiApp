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
  boxData : any 
  listBoxes: any = []

  constructor(private route: ActivatedRoute, private lookupBoxService: LookupBoxesService, private addPanier: AddPanierService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idBox = params['id']; 
    });
    this.lookupBoxService.getBoxes().subscribe((res:any) => {
      this.listBoxes = res;
      this.getData()
    })

  }

  getData() {
    this.boxData = this.listBoxes.find((uneBox:Box)=>uneBox.id==this.idBox)
    // for(let data of this.listBoxes) {
    //   if (data.id == this.idBox) {
    //     this.boxData = data
    //     console.log(this.boxData)
    //     return this.boxData
    //   } 
    // }
  }

  add() {
    this.addPanier.addPanier(this.boxData,1)
  }

  
}
