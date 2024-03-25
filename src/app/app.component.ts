import { Component } from '@angular/core';
import { AddPanierService } from './service/add-panier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sushi-app';
  panier: any = []
}
