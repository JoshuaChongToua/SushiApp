import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './component/menu/menu.component';
import { BoxesDataComponent } from './component/boxes-data/boxes-data.component';
import { DetailsComponent } from './component/details/details.component';
import { PanierComponent } from './component/panier/panier.component';
import { HistoriqueComponent } from './component/historique/historique.component';
import { RgpdComponent } from './component/rgpd/rgpd.component';

const routes: Routes = [
  {path:"",component:BoxesDataComponent},
  {path:"details/:id",component:DetailsComponent},
  {path:"panier", component:PanierComponent},
  {path:"historique", component:HistoriqueComponent},
  {path:"rgpd",component:RgpdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
