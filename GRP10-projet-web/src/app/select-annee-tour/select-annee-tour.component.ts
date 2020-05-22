import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-annee-tour',
  templateUrl: './select-annee-tour.component.html',
  styleUrls: ['./select-annee-tour.component.scss']
})

//Menu déroulant de sélection de l'année et du tou
export class SelectAnneeTourComponent {

  annee_value: String = "P17"; //valeurs par défaut
  tour_value: String = "1";

  //évènement output
  @Output() newAnneeTourEvent = new EventEmitter(); //émet si l'utilisateur change de paramètre

  constructor() { }

  //déclenche un évènement dans le component parent
  onChange(){
    this.newAnneeTourEvent.emit([this.annee_value, this.tour_value]); //on envoie les nouveaux paramètres
  }
}
