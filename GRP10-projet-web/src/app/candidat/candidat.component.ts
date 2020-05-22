import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})

//Affiche les informations d'un candidat
export class CandidatComponent {

  //données concernant le candidat
  @Input() candidat;

  constructor() { }

  //renvoie le résultat du candidat sous une forme adaptée pour une mise en style
  getPourcentage(){
    return this.candidat.pourcentage + "%";
  }

}
