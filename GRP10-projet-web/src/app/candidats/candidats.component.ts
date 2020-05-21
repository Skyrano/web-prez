import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.scss']
})
export class CandidatsComponent implements OnInit, OnChanges {

  @Input() candidats;
  sortedCandidats = [];

  constructor() { }

  ngOnInit(): void {
  }

  //fonction appelée lors de la modification de la valeur de candidats
  //trie les candidats du meilleur résultat au pire
  ngOnChanges(changes: SimpleChanges) {
    
    this.sortedCandidats = [];

    for (let candidat of this.candidats) {
      this.sortedCandidats.push(candidat);
    }

    this.sortedCandidats.sort(function(a,b)
      {
        return b.pourcentage - a.pourcentage;
      });

    //console.log(this.sortedCandidats);
}

}
