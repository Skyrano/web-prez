import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ErreurComponent } from './erreur/erreur.component';
import { MainComponent } from './main/main.component';
import { FootComponent } from './foot/foot.component';
import { ErrorManager } from './services/error.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ErreurComponent,
    MainComponent,
    FootComponent
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
