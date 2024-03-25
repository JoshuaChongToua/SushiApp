import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BoxesDataComponent } from './component/boxes-data/boxes-data.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './component/menu/menu.component';
import { DetailsComponent } from './component/details/details.component';
import { PanierComponent } from './component/panier/panier.component';
import { HistoriqueComponent } from './component/historique/historique.component';
import { RgpdComponent } from './component/rgpd/rgpd.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BoxesDataComponent,
    MenuComponent,
    DetailsComponent,
    PanierComponent,
    HistoriqueComponent,
    RgpdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
