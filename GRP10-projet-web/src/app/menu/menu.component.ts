import { Component } from '@angular/core';
import { DataRefinerService } from '../services/dataRefiner.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

//Menu situé en haut de la page
export class MenuComponent {

  constructor(private dataRefinerService: DataRefinerService) { }

  //lancé lors de l'appui sur le bouton Accueil ou le titre pour afficher et rafraichir la carte
  onRefresh() {
    this.dataRefinerService.reinitMap();
  }

}
