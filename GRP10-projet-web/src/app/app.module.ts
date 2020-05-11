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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ErreurComponent,
    MainComponent,
    FootComponent,
    ContactComponent,
    AideComponent,
    FourOfourComponent,
    MentionLegalesComponent,
    CandidatsComponent,
    CandidatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ErrorManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
