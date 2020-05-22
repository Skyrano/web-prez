import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})

//Affichage de la participation
export class ParticipationComponent {

  //données concernant la participation
  @Input() participation;

  constructor() { }

  //renvoie le pourcentage sous une forme adaptée pour la mise en style
  getPourcentage(){
    return this.participation.pourcentage + "%";
  }

}
