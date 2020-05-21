import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {

  //données concernant la participation
  @Input() participation;

  constructor() { }

  ngOnInit(): void {
  }

  //renvoie le pourcentage sous une forme adaptée pour la mise en style
  getPourcentage(){
    return this.participation.pourcentage + "%";
  }

}
