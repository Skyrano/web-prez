import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit {

  //données concernant le candidat
  @Input() candidat;

  constructor() { }

  ngOnInit(): void {
  }

  //renvoie le résultat du candidat sous une forme aaptée pour une mise en style
  getPourcentage(){
    return this.candidat.pourcentage + "%";
  }

}
