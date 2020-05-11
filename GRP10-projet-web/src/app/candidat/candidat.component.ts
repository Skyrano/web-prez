import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit {

  @Input() candidat;

  constructor() { }

  ngOnInit(): void {
  }

  getPourcentage(){
    return this.candidat.pourcentage + "%";
  }

}
