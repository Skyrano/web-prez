import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataRefinerService } from '../services/dataRefiner.service';
declare let L; //on déclare l'outil pour gérer les cartes leaflet

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

//Carte affichant les bureaux de votes
export class MapComponent implements OnInit {

  bureaux: Array<any>;    //la liste des bureaux de votes avec leurs informations géographiques et nom
  bureauxSubscription: Subscription;

  mymap: any = null; //carte leaflet
  selectedCircle: any; //cercle symbolisant le bureau actuellement sélectionné
  listCircles: Array<any>; // la liste des cercles symbolisants les bureaux

  constructor(private dataRefinerService: DataRefinerService) { }

  ngOnInit() {
    this.bureauxSubscription = this.dataRefinerService.bureauxSubject.subscribe(  //on écoute si la liste est bureau est données
      (refinedData: any) => {
        this.bureaux = refinedData;  //on récupère la liste des bureaux
        if (!this.dataRefinerService.getMapInitialized()) {  //si la map n'est pas déjà initialisé on le fait
          this.init();
        }
        else {  //sinon on rafraichit juste la carte
          this.mapRefresh();
        }
      }
    );
  }


//On initialise la carte et on lance la rechercher des données spécifique à afficher par défaut
  init() {
    this.mapInit()
    this.dataRefinerService.setMapInitialized();   //on déclare la carte comme initialisée
    this.dataRefinerService.changeSpecificData("P17","1","vi",null,null);  //On change les informations vers les informations par défaut
    this.dataRefinerService.fetchSpecificData();  //on va chercher les informations données
  }

//On (ré)initialise la carte leaflet
  mapInit() {
    this.mapRemove(); //on retire la carte si celle-ci existe
    this.mymap = L.map('map').setView([48.111707, -1.675811], 13); //on créé la carte leaflet centrée sur Rennes

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {   //on affiche la carte
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);

    this.listCircles = new Array();

    for (let i = 0; i < this.bureaux.length; i++) { // on met  tous les cercles des bureaux de la ville
      this.listCircles.push(L.circle(this.bureaux[i].point, {
        color: '#0000c1',   //bleu
        weight: 1,
        fillOpacity: 0.4,
        radius: 70
      }));
      this.listCircles[i].addTo(this.mymap);
      this.listCircles[i].on('click',(e) => {this.dataRefinerService.changeBureauxSelected(this.bureaux[i].nom)} ); //si on clique sur le cercle cela sélectionne le bureau

      var popup = L.popup();
      this.listCircles[i].on('mouseover',(e) => {popup  //on affiche le nom du bureau dans un popup quand on passe la souris dessus
                                                    .setLatLng(e.latlng)
                                                    .setContent(this.bureaux[i].nom)
                                                    .openOn(this.mymap);} );
    }
  }
//Rafraichit la carte avec le bureau sélectionné
  mapRefresh() {
    if (this.selectedCircle != null) {  //si il existait déja un bureau sélectionné on le supprime de la carte
      this.mymap.removeLayer(this.selectedCircle);
      this.selectedCircle = null;
    }
    for (let i = 0; i < this.bureaux.length; i++) {  //on cherche le bureau sélectionné parmi la liste des bureaux
      if (this.bureaux[i].selected) {
        this.selectedCircle = L.circle(this.bureaux[i].point, { //et on ajoute un point rouge sur la carte à son emplacement
          color: '#af0000',  //rouge
          weight: 1,
          fillOpacity: 1,
          radius: 80
        });
        this.selectedCircle.addTo(this.mymap);
      }
    }
  }

  //Supprime la carte actuelle si celle-ci existe
  mapRemove() {
    if (this.mymap) {
      this.mymap.off(); //on arrêt la carte (arrête entre autres les event en cours)
      this.mymap.remove(); //on supprime la carte
      this.mymap = null;
    }
  }

}
