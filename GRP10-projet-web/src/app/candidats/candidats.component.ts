import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.scss']
})

//Trie et affiche la liste de tous les candidats
export class CandidatsComponent implements OnChanges {

  @Input() candidats; //liste des candidats
  sortedCandidats = []; //liste des candidats une fois triés par résultat

  constructor() { }

  //fonction appelée lors de la modification de la valeur de candidats
  //trie les candidats du meilleur résultat au pire
  ngOnChanges(changes: SimpleChanges) {

    this.sortedCandidats = [];

    for (let candidat of this.candidats) { //on trie chaque candidat
      this.sortedCandidats.push(candidat);
    }

    this.sortedCandidats.sort(function(a,b) //différence des résultats des candidats
      {
        return b.pourcentage - a.pourcentage;
      });
}

}
