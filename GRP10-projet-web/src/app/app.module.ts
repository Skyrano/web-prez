/* Projet Web
Kiéran GOYAT
Alistair RAMEAU
Cybersécurité du logiciel
1re année
*/


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ErreurComponent } from './erreur/erreur.component';
import { MainComponent } from './main/main.component';
import { FootComponent } from './foot/foot.component';
import { ErrorManager } from './services/error.service';
import { ContactComponent } from './contact/contact.component';
import { AideComponent } from './aide/aide.component';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { MentionLegalesComponent } from './mention-legales/mention-legales.component';
import { CandidatsComponent } from './candidats/candidats.component';
import { CandidatComponent } from './candidat/candidat.component';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientService } from './services/httpclient.service';
import { ParticipationComponent } from './participation/participation.component';
import { MapComponent } from './map/map.component';
import { DataRefinerService } from './services/dataRefiner.service';
import { SelectAnneeTourComponent } from './select-annee-tour/select-annee-tour.component';
import { FormsModule } from '@angular/forms';
import { SelectBureauComponent } from './select-bureau/select-bureau.component';


@NgModule({
  declarations: [ //on déclare tous les composants utilisés
    AppComponent,
    MenuComponent,
    ErreurComponent,
    MainComponent,
    FootComponent,
    ContactComponent,
    AideComponent,
    FourOfourComponent,
    MentionLegalesComponent,
    MapComponent,
    CandidatsComponent,
    CandidatComponent,
    ParticipationComponent,
    SelectAnneeTourComponent,
    SelectBureauComponent
  ],
  imports: [   //on déclare les bibliothèques importées
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [  //on donne la liste des services
    ErrorManager,
    HttpClientService,
    DataRefinerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
