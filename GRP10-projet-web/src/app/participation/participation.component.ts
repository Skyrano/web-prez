import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {

  @Input() participation;

  constructor() { }

  ngOnInit(): void {
  }

  getPourcentage(){
    return this.participation.pourcentage + "%";
  }

}
